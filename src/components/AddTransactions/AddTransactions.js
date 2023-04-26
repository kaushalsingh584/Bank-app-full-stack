import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../layout/Navbar/Navbar'
import axios from 'axios'

const AddTransactions = () => {
  const user = {
    id: useParams().id,
    role: useParams().role,
    typeOfTransaction: useParams().type
  }
  const navigateObject = new useNavigate()
  const [allAccounts, setAllAccounts] = useState([])
  const [userAccounts, setUserAccounts] = useState([])
  const amount = useRef()
  const type = useRef()
  const senderRef = useRef() 
  const receiverRef = useRef()
  const getAllAccounts = async () => {

    // get the data
    let resp = await axios.get('http://localhost:8080/account').catch((err) => {
      alert("error occured")
      return
    })
    console.log("seeting data " + resp.data)
    // store the data
    setAllAccounts(resp.data)
    // display the data
  }
  const getAllAccountsById = async () => {

    // get the data
    let resp = await axios.get(`http://localhost:8080/customer/${user.id}`).catch((err) => {
      alert("error occured")
      return
    })
    console.log("seeting data " + resp.data)
    // store the data
    setUserAccounts(resp.data.accounts)
    // display the data
  }

  useEffect(() => {
    console.log("use effect comes into effect in Add transaction")
    getAllAccounts()
    getAllAccountsById()
  },[])
  
  const handleformSubmit = async(e)=>{
    e.preventDefault()
    const TransactionData = {
      amount : amount.current.value,
      type: type.current.value,
      // senderAccNo: senderRef.current.value,
      // receiverAccNo: receiverRef.current.value
    }
      console.log(TransactionData.type,TransactionData.receiverAccNo)

      if(TransactionData.type === "withdraw")
      {
        const resp = await axios.post(`http://localhost:8080/transaction`,{
        
        // "receiverAccNo" : "Cash Withdraw",
        "senderAccNo" : senderRef.current.value,
        "amount" : TransactionData.amount
        }).catch((err)=>{
          // console.log("error " ,err.message);
          alert("Sorry! This transaction could not be completed try again later")
          return
        })
        console.log(resp.data)
        alert("successfull")
        
      }
      else if(TransactionData.type === "deposit")
      {
        const resp = await axios.post(`http://localhost:8080/transaction`,{

        "receiverAccNo" : receiverRef.current.value,
        "amount" : TransactionData.amount
        }).catch((err)=>{
          alert("error occured")
          return
        })
        console.log(resp.data);
        alert("successfull")
        
      }
      else{
        const resp = await axios.post(`http://localhost:8080/transaction`,{

        "receiverAccNo" : receiverRef.current.value,
        "senderAccNo" : senderRef.current.value,
        "amount" : TransactionData.amount
        }).catch((err)=>{
          alert("error occured")
          return
        })
        console.log(resp.data);
        alert("successfull")
        
      }
      navigateObject(`/userdashboard/${user.role}/${user.id}/addtransaction`)
  }

  const allAccountsData = allAccounts.map((account, index) => {
    return (
      <option key={account.accountNo} value={account.accountNo}>AccountNo: {account.accountNo}, balance: {account.balance}</option>

    )
  })

  const userAccountsData = userAccounts.map((account, index) => {
    return (
      <option key={account.accountNo} value={account.accountNo}>AccountNo: {account.accountNo}, balance: {account.balance}</option>

    )
  })

  if (user.typeOfTransaction === "withdraw")
    return (<>
      <Navbar user={user} />
      <div className='container'>
      <form>

        <label >withdraw From Account</label>
        <select className="form-select" aria-label="Default select example" ref={senderRef} >
          {/* <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option> */}
          {userAccountsData}
        </select>
        <br />
        <div  className="mb-3">  
        <label htmlFor="exampleInputPassword1"  className="form-label">Type</label>
          <input type="text"  className="form-control" id="exampleInputPassword1" value = "withdraw" ref={type} disabled/>
        </div>
        <div  className="mb-3">
          <label htmlFor="exampleInputPassword1"  className="form-label">Amount</label>
          <input type="text"  className="form-control" id="exampleInputPassword1" ref={amount}/>
        </div>
        <button className='btn btn-primary' onClick={(e)=>{handleformSubmit(e)}} >Submit</button>
      </form>
    </div>
    </>)
  else if (user.typeOfTransaction === "deposit")
    return (<>
      <Navbar user={user} />
      <div className='container'>
      <form>

        <label >Deposit To Account</label>
        <select className="form-select" aria-label="Default select example" ref={receiverRef} >
          {/* <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option> */}
          {allAccountsData}
        </select>
        <br />
        <div  className="mb-3">  
        <label htmlFor="exampleInputPassword1"  className="form-label">Type</label>
          <input type="text"  className="form-control" id="exampleInputPassword1" value = "deposit" ref={type} disabled/>
        </div>
        <div  className="mb-3">
          <label htmlFor="exampleInputPassword2"  className="form-label">Amount</label>
          <input type="text"  className="form-control" id="exampleInputPassword2" ref={amount}/>
        </div>
        <button className='btn btn-primary' onClick={(e)=>{handleformSubmit(e)}} >Submit</button>
      </form>
    </div>
    </>)
  else if (user.typeOfTransaction === "transfer")
    return (
      <>
        <Navbar user={user} />
        <div className='container'>
      <form>

        <label >Transfer From Account</label>
        <select className="form-select" aria-label="Default select example" ref={senderRef} >
          {/* <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option> */}
          {userAccountsData}
        </select>
        <br />
        <label >Transfer To Account</label>
        <select className="form-select" aria-label="Default select example" ref={receiverRef} >
          {/* <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option> */}
          {allAccountsData}
        </select>
        <br />
        <div  className="mb-3">  
        <label htmlFor="exampleInputPassword1"  className="form-label">Type</label>
          <input type="text"  className="form-control" id="exampleInputPassword1" value = "transfer" ref={type} disabled/>
        </div>
        <div  className="mb-3">
          <label htmlFor="exampleInputPassword2"  className="form-label">Amount</label>
          <input type="text"  className="form-control" id="exampleInputPassword2" ref={amount}/>
        </div>
        <button className='btn btn-primary' onClick={(e)=>{handleformSubmit(e)}} >Submit</button>
      </form>
    </div>
      </>

    )
}

export default AddTransactions