import { Route,Routes } from 'react-router-dom';
import ExpenseRecordList from './features/expenseRecords/components/ExpenseRecordList';
import ExpenseRecordForm from './features/expenseRecords/screens/AddExpenseRecordForm';
import EditExpenseRecordForm from './features/expenseRecords/screens/EditExpenseRecordForm';
import ErrorPage from './components/common/ErrorPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ExpenseRecordList/> }  errorElement = {<ErrorPage />}/>
        <Route path="/add" element={ <ExpenseRecordForm/> } />
        <Route path="/:recordId/edit" element={ <EditExpenseRecordForm/> } />
      </Routes>
    </div>
  );
}

export default App;
