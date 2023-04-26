import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import UserDashboard from './components/UserDashboard/UserDashboard';
import EditBank from './components/AdminDashboard/EditBank';
import AddBank from './components/AdminDashboard/AddBank';
import Customer from './components/CustomerAdminDashboard/Customer';
import Accounts from './components/AccountsAdminDashboard/Accounts';
import EditCustomer from './components/CustomerAdminDashboard/EditCustomer/EditCustomer';
import AddCustomer from './components/CustomerAdminDashboard/AddCustomer/AddCustomer';
import AddAccount from './components/AccountsAdminDashboard/AddAccount/AddAccount';
import EditAccount from './components/AccountsAdminDashboard/EditAccount/EditAccount';

import AddTransactions from './components/AddTransactions/AddTransactions';
import Passbook from './components/Passbook/Passbook';
import Transactions from './components/Transactions/Transactions';

function App() {
  return (
    <Router>

    <Routes>
      <Route exact path='/' element={< Login />} />
      

      <Route exact path='/userdashboard/:role/:id/accounts' element={< UserDashboard />}></Route>
      {/* <Route exact path='/userdashboard/:role/:id/transactions' element={< Transactions />} /> */}
      <Route exact path='/userdashboard/:role/:id/addtransaction/:type' element={< AddTransactions />}></Route>
      <Route exact path='/userdashboard/:role/:id/addtransaction/' element={< Transactions />}></Route>
      <Route exact path='/userdashboard/:role/:id/accounts/passbook/:accountid' element={< Passbook />}></Route>


      <Route exact path='/admindashboard/:role/:id/bank' element={< AdminDashboard />} />
      <Route exact path='/admindashboard/:role/:id/bank/:bankid' element={< EditBank />}></Route>
      <Route exact path='/admindashboard/:role/:id/bank/addbank' element={< AddBank />}></Route>
  

      <Route exact path='/admindashboard/:role/:id/customer' element={< Customer />}></Route>
      <Route exact path='/admindashboard/:role/:id/customer/:customerid' element={< EditCustomer />}></Route>
      <Route exact path='/admindashboard/:role/:id/customer/addcustomer' element={< AddCustomer />}></Route>


      <Route exact path='/admindashboard/:role/:id/accounts' element={< Accounts />}></Route>
      <Route exact path='/admindashboard/:role/:id/accounts/:accountid' element={< EditAccount />}></Route>
      <Route exact path='/admindashboard/:role/:id/accounts/addaccount' element={< AddAccount />}></Route>
  
      
  
    </Routes>

    </Router>
);
}

export default App;
