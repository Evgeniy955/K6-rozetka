import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import fs from 'fs';

// Создаем cookie jar и обернутый клиент
const jar = new CookieJar();
const client = wrapper(axios.create({ jar, withCredentials: true }));

async function login(email, password) {
    try {
        const response = await client.post(
            'https://cd-staging.clinicalkey.com/auth/csas/credentials',
            {
                product: 'CK_MEDED',
                username: email,
                password: password
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        // 2. Показываем сохранённые куки
        const cookies = await jar.getCookies('https://cd-staging.clinicalkey.com/student/');
        console.log('🍪 Saved cookies:', cookies.map(c => `${c.key}=${c.value}`).join('; '));

        const setCookieHeader = response.headers['set-cookie'];
        if (setCookieHeader !== undefined && setCookieHeader.length > 0) {
            console.log('✅ Login successful');
        }
        console.log('Cookies:', setCookieHeader);

        if (setCookieHeader) {
            const jsessionid = setCookieHeader
                .find(cookie => cookie.startsWith('JSESSIONID='))
                .split(';')[0]
                .split('=')[1];

            console.log('JSESSIONID:', jsessionid);
        } else {
            console.log('JSESSIONID not found');
        }
    } catch (error) {
        if (error.response) {
            console.error('Login failed:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
    }
}

login('ckmededeng@elsevier.com', 'Test@123');

// npm install axios tough-cookie axios-cookiejar-support
