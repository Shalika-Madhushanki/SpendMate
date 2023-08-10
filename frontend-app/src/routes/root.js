import { createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
    {
    path : "/",
    element : <ExpenseRecordList></ExpenseRecordList>,
    errorElement  : <ErrorPage></ErrorPage>
    },
    {
      path : "/new",
      element : <ExpenseRecordForm></ExpenseRecordForm>
    },
    {
      path : "/edit/:recordId",
      element : <EditExpenseRecordForm></EditExpenseRecordForm>
    },
  
  ]);