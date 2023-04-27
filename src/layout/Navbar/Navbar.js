import React from 'react'
import { useNavigate } from 'react-router-dom'


const Navbar = ({user}) => {
  const navigateObject = new useNavigate()
  const account = document.getElementsByClassName('account')
    console.log("account in navrbar", account.innerText);
  
   if(user.role != "admin")
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">{user.id}</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active accounts" aria-current="page" href="accounts">Accounts</a>
        </li>
        {/* <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="transactions">Transaction</a>
        </li> */}
        <li className="nav-item">
          <a className="nav-link active addtransaction" aria-current="page" href="addtransaction">Make-Transaction</a>
        </li>

       
       
      </ul>
      <button className="d-flex btn btn-secondary">
          <a className="nav-link active" aria-current="page" href="/">Switch</a>
      </button>
      {/* <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
    </div>
  </div>
</nav>
    </>
  )

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">{user.id}</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="bank">Bank</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="customer">customer</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="accounts">Account</a>
        </li>
       
      </ul>
      <button className="d-flex btn btn-secondary">
          <a className="nav-link active" aria-current="page" href="/">Switch</a>
      </button>
    </div>
  </div>
</nav>
    </>
  )

}

export default Navbar