import { useDispatch, useSelector } from "react-redux";
import { deleteExpenseRecord } from "../slices/expenseSlice";
import { useEffect } from "react";
import { fetchAllExpenses, fetchExpenseById } from "../slices/expenseSlice";
import Spinner from "../../../components/common/Spinner";
import { fetchExpenses } from "../slices/expenseSlice";
import { Link } from "react-router-dom";
import { getCurrentFormattedDate } from "../../../utils/DateUtils";
import { currencies, paymentMethods } from "../../../utils/ListUtils";

const ExpenseRecordList = () => {
  const dispatch = useDispatch();

  //fetch all expenses
  const isFetchingExpenses = useSelector(
    (state) => state.expenseReducer.loaders.isFetchingExpenses
  );
  const fetchExpensesError = useSelector(
    (state) => state.expenseReducer.errors.fetchExpensesError
  );
  const expenseRecords = useSelector(fetchAllExpenses);

  //delete expense
  const isDeletingExpense = useSelector(
    (state) => state.expenseReducer.loaders.isDeletingExpense
  );
  const deleteExpenseError = useSelector(
    (state) => state.expenseReducer.errors.deleteExpenseError
  );

  //edit expenseRecord
  const isUpdatingExpense = useSelector(
    (state) => state.expenseReducer.loaders.isUpdatingExpense
  );
  const updateExpenseError = useSelector(
    (state) => state.expenseReducer.errors.updateExpenseError
  );

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [isDeletingExpense, isUpdatingExpense]);

  const handleDelete = async (id) => {
    await dispatch(deleteExpenseRecord(id));
  };
  switch (isFetchingExpenses) {
    case true:
      return <Spinner></Spinner>;
    case false:
      return (
        <>
          <h2>Expense records: </h2>
          <Link to="/add">Add New</Link>

          {expenseRecords.length ? (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Payment Method</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenseRecords.map((record) => (
                  <tr key={record?.id}>
                    <td>{getCurrentFormattedDate(new Date(record?.date))}</td>
                    <td>{record?.description}</td>
                    <td>
                      {
                        currencies.find(
                          (item) => item.id === record?.currency_id
                        )?.symbol
                      }
                      {record?.amount}
                    </td>
                    <td>
                      {
                        paymentMethods.find((item) => item.id === record?.type)
                          ?.title
                      }
                    </td>

                    <td>
                      <Link to={`/${record.id}/edit`}>
                        <button>Edit</button>
                      </Link>
                      <button onClick={() => handleDelete(record.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>No Records found..</div>
          )}
        </>
      );
    default:
      if (fetchExpensesError) {
        return <div>{fetchExpensesError}</div>;
      } else {
        return null;
      }
  }
};

export default ExpenseRecordList;
