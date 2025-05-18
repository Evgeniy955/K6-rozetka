import http from 'k6/http';
import { check, sleep } from 'k6';
import { handleSummary } from './summary.js';

// Breakpoint-тест: постепенное увеличение нагрузки для определения предельной точки
export const options = {
    stages: [
        { duration: '30s', target: 10 },
        { duration: '30s', target: 20 },
        { duration: '30s', target: 30 },
        { duration: '30s', target: 40 },
        { duration: '30s', target: 50 },
    ],
};

export default function () {
    const res = http.get('https://rozetka.com.ua/ua/hator-hta-914/p453054884/');
    check(res, { 'статус 200': (r) => r.status === 200 });
    sleep(1);
}

export { handleSummary };
