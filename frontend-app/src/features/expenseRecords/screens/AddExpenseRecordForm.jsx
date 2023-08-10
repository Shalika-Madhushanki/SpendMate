import { useDispatch,useSelector } from "react-redux";
import { addNewExpenseRecord } from "../slices/expenseSlice";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentFormattedDate } from "../../../utils/DateUtils";

import { categories, currencies, paymentMethods} from "../../../utils/ListUtils";

const ExpenseRecordForm = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(1);
  const [currency, setCurrency] = useState("");
  const [date, setDate] = useState(getCurrentFormattedDate(new Date()));
  const [type, setType] = useState(1);

   //add expenseRecord
   const isAddingExpense = useSelector((state) => state.expenseReducer.loaders.isAddingExpense);
   const addExpenseError = useSelector((state) => state.expenseReducer.errors.addExpenseError);
 
  const saveEnabled =
    [description, amount, category, currency, date, type].every(Boolean) &&
    !isAddingExpense;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saveEnabled) {
        await dispatch(
          addNewExpenseRecord({
            description: description,
            amount: amount,
            category_id: category,
            currency_id: currency,
            date: date,
            type: type,
          })
        ).unwrap();
        setAmount(0);
        setDescription("");
        setCategory(1);
        setCurrency(1);
        setDate(getCurrentFormattedDate(new Date()));
        setType(1);
        navigate("/");
   
    }
  };

  const category_options = categories.map((item) => (
    <option key={item.id} value={item.id}>
      {item.title}
    </option>
  ));
  return (
    <section>
      <h2>Add a new Expense</h2>
      <Link to="/" >Go Back</Link>
      <form onSubmit={handleSubmit}>
        <label>Description: </label>
        <input
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          id="description"
          type="text"
          placeholder="Descriprion.."
          value={description}
        />
        <br />
        <label>Amount: </label>
        <input
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          type="text"
          pattern="^\d+(\.\d{1,2})?$"
          placeholder="0.00"
          value={amount}
        />
        
        <select onChange={(e)=>setCurrency(e.target.value)} value={currency}>
          {currencies.map((item)=>
            <option key={item.id} value={item.id}>{item.title}</option>
          )}
        </select>
        <br />
        <label>Category: </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value={""}></option>
          {category_options}
        </select>

        <br />
        
        <label>Date: </label>
        <input
          onChange={(e) => {
            setDate(e.target.value);
          }}
          type="date"
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
        <button type="submit" disabled={!saveEnabled}>
          Save
        </button>
      </form>
    </section>
  );
};

export default ExpenseRecordForm;
