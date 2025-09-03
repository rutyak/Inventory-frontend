// allInvoiceSlice.js
import { createSlice } from "@reduxjs/toolkit";

const allInvoiceSlice = createSlice({
  name: "allInvoices",
  initialState: {
    allInvoices: [], 
    loading: false,
    error: null,
  },
  reducers: {
    addAllInvoices: (state, action) => {
      // Ensure payload is always an array
      state.allInvoices = Array.isArray(action.payload) ? action.payload : [];
      state.loading = false;
      state.error = null;
    },
    updateInvoice: (state, action) => {
      const updatedInvoice = action.payload;
      if (!updatedInvoice || !updatedInvoice._id) {
        console.error("Invalid invoice data in updateInvoice:", updatedInvoice);
        return;
      }
      
      const index = state.allInvoices.findIndex(
        (inv) => inv && inv._id === updatedInvoice._id
      );
      if (index !== -1) {
        state.allInvoices[index] = { ...state.allInvoices[index], ...updatedInvoice };
      } else {
        console.warn("Invoice not found for update:", updatedInvoice._id);
        // Optionally add the new invoice if not found
        state.allInvoices.push(updatedInvoice);
      }
    },
    incrementOpenCount: (state, action) => {
      const invoiceId = action.payload;
      if (!invoiceId) {
        console.error("Invalid invoice ID in incrementOpenCount");
        return;
      }
      
      const invoice = state.allInvoices?.find((inv) => inv && inv._id === invoiceId);
      if (invoice) {
        invoice.openCount = (invoice.openCount || 0) + 1;
      } else {
        console.warn("Invoice not found for open count increment:", invoiceId);
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload ?? true;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    // Add a reset action for cleanup
    resetInvoices: (state) => {
      state.allInvoices = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const { 
  addAllInvoices, 
  updateInvoice, 
  incrementOpenCount, 
  setLoading, 
  setError, 
  clearError, 
  resetInvoices 
} = allInvoiceSlice.actions;

// Selectors for better access
export const selectAllInvoices = (state) => state.allInvoices.allInvoices || [];
export const selectInvoicesLoading = (state) => state.allInvoices.loading;
export const selectInvoicesError = (state) => state.allInvoices.error;

export default allInvoiceSlice.reducer;