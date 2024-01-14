const express = require('express');
const categoryRouter = require('./categoryRouter');
// const transactionsRouter = require('./transactionRouter');
const userRouter = require('./userRouter');
const router = express.Router();

router.use(userRouter);
router.use(categoryRouter);
// router.use(transactionsRouter);

module.exports = router;