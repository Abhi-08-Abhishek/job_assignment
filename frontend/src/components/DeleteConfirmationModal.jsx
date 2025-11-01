import { useDispatch } from "react-redux";
import { deleteTransaction } from "../redux/transactionsSlice";
import { AlertTriangle, X } from "lucide-react";

const DeleteConfirmationModal = ({ id, onClose }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTransaction(id));
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div
        className="bg-white w-80 p-6 rounded-2xl shadow-2xl text-center animate-fadeIn relative"
        style={{ animation: "fadeIn 0.3s ease-in-out" }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Warning icon */}
        <div className="flex justify-center mb-3">
          <div className="bg-red-100 text-red-500 p-3 rounded-full">
            <AlertTriangle size={30} />
          </div>
        </div>

        {/* Message */}
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          Delete Transaction?
        </h2>
        <p className="text-sm text-gray-500 mb-5">
          This action cannot be undone. Are you sure you want to proceed?
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-1 rounded-lg shadow-md transition-all"
          >
            Yes, Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-1 rounded-lg border border-gray-300 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
