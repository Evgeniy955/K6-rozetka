import http from 'k6/http';
import { check, sleep } from 'k6';
import { handleSummary } from './summary.js';

// Spike-тест: внезапный всплеск нагрузки, чтобы проверить устойчивость к пиковым значениям
export const options = {
    stages: [
        { duration: '10s', target: 10 },
        { duration: '10s', target: 100 },
        { duration: '10s', target: 10 },
    ],
};

export default function () {
    const res = http.get('https://rozetka.com.ua/ua/hator-hta-914/p453054884/');
    check(res, { 'статус 200': (r) => r.status === 200 });
    sleep(1);
}

export { handleSummary };
