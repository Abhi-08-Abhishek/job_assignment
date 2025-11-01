import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_API_URL;

// Get Transactions
export const getTransactions = createAsyncThunk(
  "transactions/getTransactions",
  async ({ page = 1, limit = 5 } = {}) => {
    const res = await axios.get(`${BASE_URL}/transactions`, {
      params: { page, limit },
    });
    return res.data;
  }
);

// Create Transaction
export const createTransaction = createAsyncThunk(
  "transactions/create",
  async (transaction, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/transactions`, transaction);
      toast.success(res.data?.message || "Transaction added successfully!");
      return res.data;
    } catch (err) {
      toast.error("Failed to add transaction!");
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update Transaction
export const updateTransaction = createAsyncThunk(
  "transactions/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE_URL}/transactions/${id}`, data);
      toast.success(res.data?.message || "Transaction updated successfully!");
      return res.data;
    } catch (err) {
      toast.error("Failed to update transaction!");
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Delete Transaction
export const deleteTransaction = createAsyncThunk(
  "transactions/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/transactions/${id}`);
      toast.success("Transaction deleted successfully!");
      return id;
    } catch (err) {
      toast.error(err.response?.data || "Failed to delete transaction!");
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    items: [],
    loading: false,
    error: null,
    page: 1,
    totalPages: 1,
    total: 0,
    limit: 5,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.loading = false;
        const { items, totalPages, total, page, limit } = action.payload;
        state.items = items || [];
        state.totalPages = totalPages || 1;
        state.total = total || 0;
        state.page = page || 1;
        state.limit = limit || 5;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Failed to load transactions!");
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const updated = action.payload;
        const idx = state.items.findIndex((t) => t._id === updated._id);
        if (idx !== -1) state.items[idx] = updated;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t._id !== action.payload);
      });
  },
});

export default transactionsSlice.reducer;
