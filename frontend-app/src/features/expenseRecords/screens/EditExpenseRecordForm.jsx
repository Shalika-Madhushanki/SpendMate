import { useDispatch, useSelector } from "react-redux";
import {
  fetchExpenseRecordById,
  updateExpenseRecord,
} from "../slices/expenseSlice";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getCurrentFormattedDate } from "../../../utils/DateUtils";
import { categories,currencies,paymentMethods } from "../../../utils/ListUtils";

const EditExpenseRecordForm = () => {
  const { recordId } = useParams();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(1);
  const [currency, setCurrency] = useState(1);
  const [date, setDate] = useState("");
  const [type, setType] = useState(1);
  const [updateRequestStatus, setUpdateRequestStatus] = useState("idle");

    //update expenseRecord
    const isUpdatingExpense = useSelector((state) => state.expenseReducer.loaders.isUpdatingExpense);
    const updateExpenseError = useSelector((state) => state.expenseReducer.errors.updateExpenseError);

  const category_options = categories.map((item) => (
    <option key={item.id} value={item.id}>
      {item.title}
    </option>
  ));

  const updateEnabled =
    [description, amount, category, currency, date, type].every(Boolean) &&
    !isUpdatingExpense;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selected_record = useSelector(
    (state) => state.expenseReducer.selectedExpense
  );

  useEffect(() => {
    dispatch(fetchExpenseRecordById(recordId));
  }, []);

  useEffect(() => {
    const expense = selected_record.expense;

    setDescription(expense?.description);
    setAmount(expense?.amount);
    setCategory(expense?.category_id);
    setCurrency(expense?.currency_id);
    setType(expense?.type);
    setDate(getCurrentFormattedDate(new Date(expense?.date)));
  }, [selected_record]);

  const updatedExpense = {
    description: description,
    amount: amount,
    category_id: category,
    currency_id: currency,
    date: date,
    type: type,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (updateEnabled) {
        dispatch(updateExpenseRecord({ recordId, updatedExpense }));
        navigate("/");
      
    }
  };

  return (
    <div>
      <div>
        <h2>Edit Expense</h2>
        <Link to="/" >Go Back</Link>
        <form onSubmit={handleSubmit}>
          <label>Description</label>
          <input
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            type="text"
            placeholder="Expense Descriprion.."
            value={description}
          />
          <br />
          <label>Amount</label>
          <input
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            type="text"
            placeholder="0.00"
            value={amount}
            pattern="^\d+(\.\d{1,2})?$"

          />
          <select onChange={(e)=>setCurrency(e.target.value)} value={currency}>
          {currencies.map((item)=>
            <option key={item.id} value={item.id}>{item.title}</option>
          )}
        </select>
        <br/>
          <label>Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value={""}></option>
            {category_options}
          </select>
          <br />
          <label>Date</label>
          <input
            onChange={(e) => {
              setDate(e.target.value);
            }}
            type="date"
            placeholder="Date.."
            value={date}
          />
          <br />
          <label>Payment Method: </label>
        <select onChange={(e)=>setType(e.target.value)} value={type}>
          {paymentMethods.map((item)=>
            <option key={item.id} value={item.id}>{item.title}</option>
          )}
        </select>
          <br />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditExpenseRecordForm;
