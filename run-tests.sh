#!/bin/bash

# Функция для запуска одного теста
run_test() {
  local test_file=$1
  echo "🚀 Запуск теста: $test_file"
  k6 run "$test_file"
  echo "✅ Завершёно: $test_file"
  echo "-------------------------------"
}

# Меню доступных тестов
case "$1" in
  average)
    run_test "tests/averageLoad.test.js"
    ;;
  breakpoint)
    run_test "tests/breakpoint.test.js"
    ;;
  smoke)
    run_test "tests/smoke.test.js"
    ;;
  soak)
    run_test "tests/soak.test.js"
    ;;
  spike)
    run_test "tests/spike.test.js"
    ;;
  stress)
    run_test "tests/stress.test.js"
    ;;
  all)
    for test in averageLoad.test.js breakpoint.test.js smoke.test.js soak.test.js spike.test.js stress.test.js; do
      run_test "$test"
    done
    ;;
  *)
    echo "❗ Использование: $0 [average|breakpoint|smoke|soak|spike|stress|all]"
    exit 1
    ;;
esac

#./run-tests.sh smoke
