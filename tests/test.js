import { browser } from 'k6/browser';
import http from 'k6/http';
import { check } from 'k6';

export const options = {
    scenarios: {
        browser: {
            executor: 'constant-vus',
            exec: 'browserTest',
            vus: 1,
            duration: '10s',
            options: {
                browser: {
                    type: 'chromium',
                },
            },
        },
        news: {
            executor: 'constant-vus',
            exec: 'news',
            vus: 20,
            duration: '1m',
        },
    },
};

export async function browserTest() {
    const page = await browser.newPage();

    try {
        await page.goto('https://cd-staging.clinicalkey.com/student/login');
        // ...логин через браузер руками или автозаполнение
        // await page.locator('input[name="username"]').fill('...');
        // await page.locator('input[name="password"]').fill('...');
        // await page.locator('button[type="submit"]').click();
        // await page.waitForURL('.../dashboard');
        // можно получить куки для ручной вставки, если нужно
        const cookies = await page.context().cookies();
        console.log('Browser cookies:', cookies.map(c => `${c.name}=${c.value}`).join('; '));
        // Если хочешь — можешь вывести их и вставить в http-запросы руками
    } finally {
        await page.close();
    }
}

export function news() {
    const jar = http.cookieJar();

    // Логинимся в каждом VU
    const loginRes = http.post(
        'https://cd-staging.clinicalkey.com/auth/csas/credentials',
        JSON.stringify({
            product: 'CK_MEDED',
            username: 'ckmededeng@elsevier.com',
            password: 'Test@123',
        }),
        {
            headers: { 'Content-Type': 'application/json' },
            jar: jar,
        }
    );

    check(loginRes, { 'login status 200': (r) => r.status === 200 });

    // После логина jar содержит куки для этого VU
    const res = http.get(
        'https://cd-staging.clinicalkey.com/student',
        { jar: jar }
    );

    check(res, { 'protected page 200': (r) => r.status === 200 });
}
