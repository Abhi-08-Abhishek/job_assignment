import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTransaction } from "../redux/transactionsSlice";
import { X } from "lucide-react";

const EditTransactionModal = ({ transaction, onClose }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(transaction);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTransaction({ id: transaction._id, data: form }));
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div
        className="bg-white rounded-2xl shadow-2xl w-96 p-6 animate-fadeIn"
        style={{ animation: "fadeIn 0.3s ease-in-out" }}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Edit Transaction
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

  
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 rounded-lg p-2.5 text-gray-700 outline-none transition-all"
              placeholder="Enter category"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 rounded-lg p-2.5 text-gray-700 outline-none transition-all"
              placeholder="Enter description"
            />
          </div>

  
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 rounded-lg p-2.5 text-gray-700 outline-none transition-all"
              placeholder="Enter amount"
              required
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Type
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 rounded-lg p-2.5 text-gray-700 outline-none transition-all"
              required
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

        
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-1 rounded-lg border border-gray-300 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-1 rounded-lg bg-slate-600 text-white font-medium hover:bg-slate-900 shadow-md transition-all"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTransactionModal;
