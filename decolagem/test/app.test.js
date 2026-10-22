const assert = require('assert');
const http = require('http');
const app = require('../src/app');

function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const server = app.listen(0, () => {
      const { port } = server.address();
      const req = http.request(
        {
          hostname: '127.0.0.1',
          port,
          path,
          method: options.method || 'GET',
          headers: options.headers || {},
        },
        (res) => {
          let body = '';
          res.setEncoding('utf8');
          res.on('data', (chunk) => {
            body += chunk;
          });
          res.on('end', () => {
            server.close(() => resolve({ statusCode: res.statusCode, body, headers: res.headers }));
          });
        }
      );

      req.on('error', (error) => {
        server.close(() => reject(error));
      });

      if (options.body) {
        req.write(options.body);
      }

      req.end();
    });
  });
}

(async () => {
  const rootResponse = await request('/');
  assert.strictEqual(rootResponse.statusCode, 200, 'GET / should return 200');
  assert.match(rootResponse.body, /Controle Financeiro/i, 'The page should contain the app title');

  const listResponse = await request('/expenses');
  assert.strictEqual(listResponse.statusCode, 200, 'GET /expenses should return 200');
  assert.strictEqual(listResponse.body, '[]', 'GET /expenses should return an empty list initially');

  const createResponse = await request('/expenses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ description: 'Almoço', amount: 25.5 }),
  });

  assert.strictEqual(createResponse.statusCode, 201, 'POST /expenses should create a new expense');
  const createdExpense = JSON.parse(createResponse.body);
  assert.strictEqual(createdExpense.description, 'Almoço');
  assert.strictEqual(createdExpense.amount, 25.5);

  assert.strictEqual(createdExpense.descripition, undefined, 'Expense should not carry a misspelled duplicate field');

  const invalidResponse = await request('/expenses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ description: '   ', amount: -1 }),
  });
  assert.strictEqual(invalidResponse.statusCode, 400, 'POST /expenses should reject invalid input');

  console.log('Integration test passed');
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
