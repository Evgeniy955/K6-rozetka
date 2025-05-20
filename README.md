# Setup

## Terminal commands

1. Check Node.js version:
   ```bash
   brew install k6
   
2. Run the test use console options:
   ```bash
   k6 run --vus 10 --duration 30s script.js
   ```

3. Run:
   ```bash
   k6 run tests/browserTest.test.js
    ```
   
4. Run use .sh file:
   ```bash
   ./run-tests.sh spike
    ```
5. Run with options JSON:
   ```bash
   k6 run --out json=test_results.json my-first-test.js
    ```

- npm install html-pdf

