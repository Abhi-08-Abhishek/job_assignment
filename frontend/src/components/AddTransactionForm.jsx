import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTransaction } from "../redux/transactionsSlice";

const AddTransactionForm = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    type: "income",
    amount: "",
    description: "",
    category: "",
    date: "",
  });

  // handle input data
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.amount || !form.category || !form.date) {
      alert("Please fill all required fields.");
      return;
    }

    // convert amount to number
    const transactionData = {
      ...form,
      amount: Number(form.amount),
    };

    dispatch(createTransaction(transactionData));

    //  after complete reset form
    setForm({
      type: "income",
      amount: "",
      description: "",
      category: "",
      date: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white shadow-lg p-6 rounded-2xl flex flex-col gap-4 border border-gray-100"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        Add Transaction
      </h2>

      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="border p-2 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <input
        type="number"
        name="amount"
        value={form.amount}
        onChange={handleChange}
        placeholder="Amount"
        className="border p-2 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
        required
      />

      <input
        type="text"
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
        className="border p-2 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
        required
      />

      <input
        type="text"
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description (optional)"
        className="border p-2 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
      />

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="border p-2 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
        required
      />

      <button
        type="submit"
        className="bg-slate-600 text-white py-2 rounded-md hover:bg-slate-900 transition-all"
      >
        Add Transaction
      </button>
    </form>
  );
};

export default AddTransactionForm;
