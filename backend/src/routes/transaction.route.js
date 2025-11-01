import express from 'express';
const router = express.Router();

import {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} from '../controller/transaction.controller.js';

router.post('/', createTransaction);
router.get('/', getTransactions);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

export default router;
