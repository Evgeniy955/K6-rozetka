import { check, sleep } from 'k6';
import http from 'k6/http';

export const options = {
    scenarios: {
        news: {
            executor: 'constant-vus',
            vus: 20,
            duration: '1m',
            exec: 'news',
        },
    },
};

export function news() {
    // 1. Создаем cookie jar для этой VU
    const jar = http.cookieJar();

    // 2. Логинимся и куки сохраняются в jar автоматически
    const loginRes = http.post(
        'https://cd-staging.clinicalkey.com/auth/csas/credentials',
        JSON.stringify({
            product: 'CK_MEDED',
            username: 'ckmededeng@elsevier.com',
            password: 'Test@123',
        }),
        {
            headers: {
                'Content-Type': 'application/json',
            },
            jar: jar,
        }
    );

    check(loginRes, {
        'login status 200': (r) => r.status === 200,
    });

    // 3. После логина jar содержит куки, которые подставятся в следующие запросы
    // Например, делаем защищённый GET-запрос
    const res = http.get(
        'https://cd-staging.clinicalkey.com/student',
        { jar: jar }
    );

    check(res, {
        'protected page 200': (r) => r.status === 200,
    });

    sleep(1);
}
