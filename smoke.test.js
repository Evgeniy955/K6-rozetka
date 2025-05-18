import http from 'k6/http';
import { check, sleep } from 'k6';
import { handleSummary } from './summary.js';

// Smoke-тест: минимальная нагрузка для проверки работоспособности страницы
export const options = {
    vus: 1,
    duration: '10s',
};

export default function () {
    const res = http.get('https://rozetka.com.ua/ua/hator-hta-914/p453054884/');
    check(res, { 'статус 200': (r) => r.status === 200 });
    sleep(1); // пауза между запросами
}

export { handleSummary };
