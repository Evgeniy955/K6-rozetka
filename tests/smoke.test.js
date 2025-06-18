import http from 'k6/http';
import { check, sleep } from 'k6';
import { handleSummary } from '../summary.js';

// Smoke-тест: минимальная нагрузка для проверки работоспособности страницы
export const options = {
    vus: 10,
    duration: '10s',
};

export default function () {
    const res = http.get('https://elmir.ua/cell_phones/mobile-phone-samsung-galaxy-s25-ultra-12gb-1tb-titanium-black-sm-s938bzkheuc.html');
    check(res, { 'статус 200': (r) => r.status === 200 });
    sleep(1); // пауза между запросами
}

export { handleSummary };
