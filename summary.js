import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/2.1.1/dist/bundle.js";
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

// Получение имени файла отчета
function getFilename() {
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, '0');

    const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
    const time = `${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;

    // Можно автоматически использовать имя скрипта, если нужно
    const scriptName = __ENV.TEST_NAME || "test";

    return `summary_${scriptName}_${date}_${time}.html`;
}

// Генерация HTML-отчета + CLI-вывод
export function handleSummary(data) {
    const filename = getFilename();

    return {
        [filename]: htmlReport(data),
        stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
}
