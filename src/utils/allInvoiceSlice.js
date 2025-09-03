import { createSlice } from "@reduxjs/toolkit";

const allInvoiceSlice = createSlice({
  name: "allInvoices",
  initialState: {
    allInvoices: [],
  },
  reducers: {
    addAllInvoices: (state, action) => {
      state.allInvoices = action.payload;
    },
    updateInvoice: (state, action) => {
      const updatedInvoice = action.payload;
      const index = state.allInvoices.findIndex(
        (inv) => inv._id === updatedInvoice._id
      );
      if (index !== -1) {
        state.allInvoices[index] = updatedInvoice;
      }
    },
    incrementOpenCount: (state, action) => {
      const invoiceId = action.payload;
      const invoice = state.allInvoices?.find((inv) => inv._id === invoiceId);
      if (invoice) {
        invoice.openCount = (invoice.openCount || 0) + 1;
      }
    },
  },
});

export const { addAllInvoices, updateInvoice, incrementOpenCount } =
  allInvoiceSlice.actions;

export default allInvoiceSlice.reducer;
