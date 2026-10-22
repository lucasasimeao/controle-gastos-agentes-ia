const express = require('express');

const router = express.Router();

const expenses = [];
let nextId = 1;

function parseAmount(value) {
  const amount = Number(value);
  return Number.isFinite(amount) && amount > 0 ? amount : null;
}

router.get('/', (_req, res) => {
  res.json(expenses);
});

router.post('/', (req, res) => {
  const { description, amount } = req.body ?? {};
  const normalizedDescription = typeof description === 'string' ? description.trim() : '';
  const normalizedAmount = parseAmount(amount);

  if (!normalizedDescription) {
    return res.status(400).json({ error: 'Description is required.' });
  }

  if (normalizedAmount === null) {
    return res.status(400).json({ error: 'Amount must be a positive number.' });
  }

  const expense = {
    id: nextId++,
    description: normalizedDescription,
    amount: normalizedAmount,
  };

  expenses.push(expense);

  return res.status(201).json(expense);
});

module.exports = router;
