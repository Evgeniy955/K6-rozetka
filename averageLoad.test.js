import http from 'k6/http';
import { check, sleep } from 'k6';
import { handleSummary } from './summary.js';

// Average Load тест: проверка системы при стандартной ожидаемой нагрузке
export const options = {
    vus: 10,
    duration: '1m',
};

export default function () {
    const res = http.get('https://rozetka.com.ua/ua/hator-hta-914/p453054884/');
    check(res, { 'статус 200': (r) => r.status === 200 });
    sleep(1);
}

export { handleSummary };
