import Transaction from "../model/transaction.model.js";
import logger from "../utils/logger.js";
import { validatorCreate, validatorUpdate } from "../validate/validator.js";

// create transaction
export const createTransaction = async (req, res) => {
  logger.info("create transaction endpoint hit...");

  try {
    const { error, value } = validatorCreate(req.body);

    if (error) {
      logger.warn("Validation error", error.details[0].message);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const tran = new Transaction(value);
    await tran.save();

    logger.info("Transaction saved successfully");
    res.status(201).json(tran);

  } catch (err) {
    logger.error("Error creating transaction occurred", err);
    res.status(500).json({
      success: false,
      message: "Error creating transaction",
      error: err.message,
    });
  }
};

// get transactions
export const getTransactions = async (req, res) => {
  logger.info("get all transaction endpoint hit...");

  try {
    const { type, category, dateFrom, dateTo, page = 1, limit = 5 } = req.query;

    const query = {};
    if (type) query.type = type;
    if (category) query.category = category;
    if (dateFrom || dateTo) {
      query.date = {};
      if (dateFrom) query.date.$gte = new Date(dateFrom);
      if (dateTo) query.date.$lte = new Date(dateTo);
    }

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const [items, total] = await Promise.all([
      Transaction.find(query).sort({ date: -1 }).skip(skip).limit(limitNum),
      Transaction.countDocuments(query),
    ]);

    logger.info("Fetched transactions successfully");

    res.status(200).json({
      success: true,
      message: "Fetched transactions successfully",
      items,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    });

  } catch (err) {
    logger.error("Error getting transactions occurred", err);
    res.status(500).json({
      success: false,
      message: "Error getting transactions",
      error: err.message,
    });
  }
};

// update transaction
export const updateTransaction = async (req, res) => {
  logger.info("update transaction endpoint hit...");

  try {
    const { error, value } = validatorUpdate(req.body);

    if (error) {
      logger.warn("Validation error", error.details[0].message);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const id = req.params.id;
    const tran = await Transaction.findByIdAndUpdate(id, value, { new: true });

    if (!tran) {
      logger.warn("Transaction not found");
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    logger.info("Transaction updated successfully");
    res.status(200).json(tran);

  } catch (err) {
    logger.error("Error while updating transaction occurred", err);
    res.status(500).json({
      success: false,
      message: "Error updating transaction",
      error: err.message,
    });
  }
};

// delete transaction
export const deleteTransaction = async (req, res) => {
  logger.info("delete transaction endpoint hit...");
  try {
    const id = req.params.id;

    const tran = await Transaction.findByIdAndDelete(id);
    if (!tran) {
      logger.warn("Transaction not found");
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    logger.info("Transaction deleted successfully");
    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
      id: tran._id,
    });
  } catch (err) {
    logger.error("Error while deleting transaction occurred", err);
    res.status(500).json({
      success: false,
      message: "Error deleting transaction",
      error: err.message,
    });
  }
};
