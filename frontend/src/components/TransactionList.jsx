import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import EditTransactionModal from "./EditTransactionModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { getTransactions } from "../redux/transactionsSlice";

const TransactionList = () => {
  const dispatch = useDispatch();
  const {
    items = [],
    loading,
    error,
    totalPages = 1,
    page: currentPage = 1,
  } = useSelector((state) => state.transactions);

  const [editItem, setEditItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [page, setPage] = useState(currentPage || 1);
  const limit = 5;

  // Fetch transactions whenever page changes
  useEffect(() => {
    dispatch(getTransactions({ page, limit }));
  }, [dispatch, page]);

  if (loading)
    return (
      <p className="text-center text-gray-500 mt-4">Loading transactions...</p>
    );

  if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
        Transaction History
      </h2>

      {items.length === 0 ? (
        <p className="text-gray-500 text-center">No transactions yet.</p>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-xl">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Category</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Description</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Date</th>
                  <th className="px-4 py-2 text-center text-sm font-semibold text-gray-600">Type</th>
                  <th className="px-4 py-2 text-center text-sm font-semibold text-gray-600">Amount</th>
                  <th className="px-4 py-2 text-center text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {items.map((t) => (
                  <tr key={t._id} className="hover:bg-gray-100 transition-all">
                    <td className="px-4 py-3 text-gray-700 font-medium capitalize">{t.category}</td>
                    <td className="px-4 py-3 opacity-50 font-semibold text-sm">{t.description}</td>
                    <td className="px-4 py-3 opacity-40 text-sm">
                      {t.date ? new Date(t.date).toLocaleDateString() : "No date"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-semibold ${
                          t.type === "income"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {t.type}
                      </span>
                    </td>
                    <td
                      className={`px-4 py-3 text-center font-semibold ${
                        t.type === "income" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      ₹ {t.amount || 0}
                    </td>
                    <td className="px-4 py-3 text-center flex justify-center gap-4">
                      <button
                        onClick={() => setEditItem(t)}
                        className="flex items-center gap-1 text-blue-500 hover:text-blue-700 transition-colors"
                      >
                        <Pencil size={16} /> Edit
                      </button>
                      <button
                        onClick={() => setDeleteId(t._id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-3 mt-8">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-sm ${
                page === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-blue-600 border border-blue-300 hover:bg-blue-50 hover:shadow-md"
              }`}
            >
              ← Prev
            </button>

            <div className="flex items-center gap-2 text-gray-600 font-medium">
              <span className="px-3 py-1 bg-blue-50 text-blue-600 font-semibold rounded-lg shadow-sm">
                {page}
              </span>
              <span className="text-gray-400">of</span>
              <span className="font-semibold text-gray-700">{totalPages || 1}</span>
            </div>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-sm ${
                page === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-blue-600 border border-blue-300 hover:bg-blue-50 hover:shadow-md"
              }`}
            >
              Next →
            </button>
          </div>
        </>
      )}

      {/* Modals */}
      {editItem && (
        <EditTransactionModal
          transaction={editItem}
          onClose={() => setEditItem(null)}
        />
      )}
      {deleteId && (
        <DeleteConfirmationModal
          id={deleteId}
          onClose={() => setDeleteId(null)}
        />
      )}
    </div>
  );
};

export default TransactionList;
