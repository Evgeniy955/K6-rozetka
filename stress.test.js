import http from 'k6/http';
import { check, sleep } from 'k6';
import { handleSummary } from './summary.js';

// Stress-тест: нагрузка, превышающая ожидаемую, для определения устойчивости
export const options = {
    stages: [
        { duration: '30s', target: 50 },
        { duration: '30s', target: 100 },
        { duration: '30s', target: 150 },
        { duration: '30s', target: 200 },
        { duration: '30s', target: 0 },
    ],
};

export default function () {
    const res = http.get('https://rozetka.com.ua/ua/hator-hta-914/p453054884/');
    check(res, { 'статус 200': (r) => r.status === 200 });
    sleep(1);
}

export { handleSummary };
