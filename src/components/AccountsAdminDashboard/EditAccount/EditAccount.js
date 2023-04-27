import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const EditAccount = () => {
  const navigateObject = new useNavigate()
  const user = {
    id : useParams().id,
    role : useParams().role,
    accountNo : useParams().accountid
  }

    const [balance, setBalance] = useState(0)
    const [customer, setCustomer] = useState([])
    const customerRef = useRef()
    // const [abbreviation, setAbbreviation] = useState("abbreviation")
  
  
  
    const handleEditForm = async (e) => {
      const response = await axios.get(`http://localhost:8080/account/${user.accountNo}`).catch((err) => {
        alert("error occured")
        return
      })
  
      if (!response.data) {
        alert("No data found")
        return
      }
  
      setBalance(response.data.balance)
    //   setAbbreviation(response.data.abbreviation)
      console.log("Balance: " + balance);
    }
  
    const SubmitEditForm = async (e) => {
      e.preventDefault()
      const response = await axios.put(`http://localhost:8080/account`, {
        "accountNo": user.accountNo,
        "balance": balance       
  
      }).catch((err) => {
        alert("error occured")
        return
      })
      console.log("new balance " , balance);
      console.log("customer selected is: ", customerRef.current.value);

      const accountAssignToCustomer = await axios.put(`http://localhost:8080/customer/account?customerId=${customerRef.current.value}&accountId=${user.accountNo}`
       ).catch((err) => {
        alert("error occured")
        return
      })

      navigateObject(`/admindashboard/${user.role}/${user.id}/accounts`)
      console.log("Reached");
  
    }
    
    const getAllCustomers=async(e)=>{
      let respAll = await axios.get(`http://localhost:8080/customer`).catch((err) =>{
          alert("error occured")
          return 
      }).catch((err)=>{
          console.log("error occured while fetching bank")
          return
      })
      console.log("got all customer");
      setCustomer(respAll.data)
  }
  // const handleSelectChange = (event) => {
  //     const value = event.target.value;
  //     setSelectedOption(value);
  //   };
  const customerData = customer.map((customer, index)=>{
      return(
          <option key={customer.customerid} value = {customer.customerid}>id: {customer.customerid}, Name: {customer.firstName}</option>
      )
  })
    useEffect(() => {
      console.log("use effect comes into effect edit form")
      handleEditForm()
      getAllCustomers()
    },[])
  
    return (
      <div className="container">
  
        <form>
          <div className="mb-3">
            <label className="form-label">Account ID</label>
            <input type="text" className="form-control" value={user.accountNo} disabled/>
          </div>
          <div className="mb-3">
                 
          <label >Assign Customer</label>
                <select className="form-select" aria-label="Default select example" ref={customerRef} >
                    {/* <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option> */}
                    {customerData}
                </select>
            <label className="form-label">Balance</label>
            <input type="text" className="form-control" value={balance}
              onChange={
                (e) =>  setBalance(e.target.value) 
              } />
  
          </div>
         
       
          <button className="btn btn-primary" onClick={(e)=>SubmitEditForm(e)}>Submit</button>
        </form>
  
      </div>
    )
}

export default EditAccount