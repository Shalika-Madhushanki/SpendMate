import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async () => {
    const response = await axios.get("/app/expenses");
    return response.data;
  }
);

export const addNewExpenseRecord = createAsyncThunk(
  "expenses/addNewExpense",
  async (expenseRecord) => {
    const response = await axios.post("app/expenses", expenseRecord);
    return response.data;
  }
);

export const deleteExpenseRecord = createAsyncThunk(
  "expenses/deleteExpenseRecord",
  async (id) => {
    const response = await axios.delete("app/expenses/" + id);
    return response.data;
  }
);

export const updateExpenseRecord = createAsyncThunk(
  "expenses/updateExpenseRecord",
  async ({recordId, updatedExpense}) => {
    const response = await axios.put(`/app/expenses/${recordId}`, updatedExpense);
    return response.data;
  }
);

export const fetchExpenseRecordById = createAsyncThunk(
  "expenses/fetchExpenseById",
  async (id) => {
    const response = await axios.get("app/expenses/" + id);
    return response.data;
  }
);

const expenseRecoderSlice = createSlice({
  name: "expenseRecord",
  initialState: {
    expenses: [],
    selectedExpense: {
      selected: false,
      expense: null,
      error: null,
    },
    loaders: {
      isFetchingExpenses: false,
      isFetchingExpense: false,
      isAddingExpense: false,
      isDeletingExpense: false,
      isUpdatingExpense: false,
    },
    errors: {
      fetchExpensesError: null,
      fetchExpenseError: null,
      deleteExpenseError: null,
      addExpenseError: null,
      updateExpenseError: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Fetch all expenses
      .addCase(fetchExpenses.pending, (state) => {
        state.loaders.isFetchingExpenses = true;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loaders.isFetchingExpenses = false;
        state.expenses = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.errors.fetchExpensesError = action.error.message;
      })
      //add expense
      .addCase(addNewExpenseRecord.pending, (state, action) => {
        state.loaders.isAddingExpense = true;
      })
      .addCase(addNewExpenseRecord.fulfilled, (state, action) => {
        state.loaders.isAddingExpense = false;
        state.expenses.push(action.payload);
      })
      .addCase(addNewExpenseRecord.rejected, (state, action) => {
        state.errors.addExpenseError = action.error;
      })
      //update response
      .addCase(updateExpenseRecord.pending, (state, action) => {
        state.loaders.isUpdatingExpense = true;
      })
      .addCase(updateExpenseRecord.fulfilled, (state, action) => {
        state.loaders.isUpdatingExpense = false;
      }).addCase(updateExpenseRecord.rejected, (state, action) => {
        state.errors.updateExpenseError = action.error
      })
      //fetch expense by id
      .addCase(fetchExpenseRecordById.pending, (state, action) => {
        state.loaders.isFetchingExpense = true;
      })
      .addCase(fetchExpenseRecordById.fulfilled, (state, action) => {
        state.loaders.isFetchingExpense = false;
        state.selectedExpense.expense = action.payload
      })
      .addCase(fetchExpenseRecordById.rejected, (state, action) => {
        state.errors.fetchExpenseError= action.error;
      })
      //delete expense record
      .addCase(deleteExpenseRecord.pending, (state, action) => {
        state.loaders.isDeletingExpense = true;      
      })
      .addCase(deleteExpenseRecord.fulfilled, (state, action) => {
        state.loaders.isDeletingExpense = false;
      })
      .addCase(deleteExpenseRecord.rejected, (state, action) => {
        state.errors.deleteExpenseError = action.error;
      });
  },
});

export const fetchAllExpenses = (state) => state.expenseReducer.expenses;
export const fetchExpenseById = (state, id) =>
  state.expenseReducer.expenses.find((record) => record.id === id);

export const {} = expenseRecoderSlice.actions;
export default expenseRecoderSlice.reducer;

const initialState = {
  //   expenses: ["1111111", "1111112"],
  //   expensesData: {
  //     1111111: {
  //       description: "dafafsf",
  //     },
  //     1111112: {
  //       description: "dafafsf",
  //     },
  //   },
  expenses: [],
  favourites: [],

  loaders: {
    isFetchingExpenses: false,
    isFetchingFavourites: false,
    isAddingExpense: false,
    isDeletingExpense: false,
    isUpdatingExpense: false,
  },
  erors: {
    fetchExpensesError: null,
    fetchExpenseError: null,
    deleteExpenseError: null,
    addExpenseError: null,
    updateExpenseError: null,
  },
};

// selector > expensesData
// expensesData[id]
// const isLoading = isFetchingExpenses || isFetchingFavourites|| ....