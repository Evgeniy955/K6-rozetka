#!/bin/bash

echo "🔧 Запуск всех K6 тестов..."

for test in smoke averageLoad stress soak spike breakpoint
do
  echo "🚀 Запуск: $test.test.js"
  k6 run "$test.test.js"
  echo "✅ Завершено: $test.test.js"
  echo ""
done

echo "🎉 Все тесты завершены. Отчеты готовы."
