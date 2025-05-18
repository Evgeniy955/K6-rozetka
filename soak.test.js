import http from 'k6/http';
import { check, sleep } from 'k6';
import { handleSummary } from './summary.js';

// Soak-тест: длительная нагрузка для выявления утечек памяти и деградации производительности
export const options = {
    vus: 20,
    duration: '10m',
};

export default function () {
    const res = http.get('https://rozetka.com.ua/ua/hator-hta-914/p453054884/');
    check(res, { 'статус 200': (r) => r.status === 200 });
    sleep(1);
}

export { handleSummary };
