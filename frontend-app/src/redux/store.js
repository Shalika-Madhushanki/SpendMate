import { configureStore,applyMiddleware } from "@reduxjs/toolkit";
import expenseRecordReducer from "../features/expenseRecords/slices/expenseSlice";
import { createLogger } from "redux-logger";


const logger = createLogger({
    diff: true,
  }); 

const store = configureStore({
    reducer : {
        expenseReducer : expenseRecordReducer,
        
    }
,middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)});


export default store;