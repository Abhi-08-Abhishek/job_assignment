"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { getTransactions } from "../redux/transactionsSlice";

import AddTransactionForm from "../components/AddTransactionForm";
import ExpenseChart from "../components/ExpenseChart";
import TransactionList from "../components/TransactionList";
import SummaryCards from "../components/SummaryCards";

export default function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200">
      <motion.nav
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="top-0 left-0 w-full bg-slate-900 text-white shadow-lg"
      >
        <div className="flex items-center justify-center  py-5 ">
          <h1 className="text-2xl md:text-3xl font-bold">
            Expense Tracker
          </h1>
        </div>
      </motion.nav>

      <div className="py-4 px-4">
        <div className="w-full mx-auto flex flex-col gap-10">
          {/* Summary Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <SummaryCards />
          </motion.div>

          {/* Form + Chart Section */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-100">
              <AddTransactionForm />
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-100">
              <ExpenseChart />
            </div>
          </motion.div>

          {/* Transaction List Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all"
          >
            <TransactionList />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
