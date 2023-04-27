import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const EditCustomer = () => {
    const user = {
      id : useParams().id,
      role : useParams().role,
      customerid : useParams().customerid
    }
    const navigateObject = new useNavigate()
    const [firstName, setFirstName] = useState("first name")
    const [lastName, setlastName] = useState("last name")
    const [totalBalance, setTotalBaalance] = useState(0)
  
  
  
    const handleEditForm = async (e) => {
      const response = await axios.get(`http://localhost:8080/customer/${user.customerid}`).catch((err) => {
        alert("error occured")
        return
      })
  
      if (!response.data) {
        alert("No data found")
        return
      }
  
      setFirstName(response.data.firstName)
      setlastName(response.data.lastName)
      setTotalBaalance(response.data.totalBalance)
      console.log("fistname: " + firstName);
    }
  
    const SubmitEditForm = async (e) => {
      e.preventDefault()
      console.log(user.customerid,firstName,lastName,totalBalance);
      const response = await axios.put(`http://localhost:8080/customer`, {
        "customerid" : user.customerid,
        "firstName" : firstName,
        "lastName" :lastName,
        "totalBalance" : totalBalance,
        "role": "user"
  
      }).catch((err) => {
        alert("error occured")
        return
      })
  
      navigateObject(`/admindashboard/${user.role}/${user.id}/customer`)
    }
  
    useEffect(() => {
      console.log("use effect comes into effect edit form")
      handleEditForm()
    },[])
  
    return (
      
      <div className='container' >
  
        <form>

          <div className="mb-3">
            <label className="form-label">Customer ID</label>
            <input type="text" className="form-control" value={user.customerid} disabled/>
          </div>
          <div className="mb-3">
            <label className="form-label">FirstName</label>
            <input type="text" className="form-control" value={firstName}
              onChange={
                (e) =>  setFirstName(e.target.value) 
              } ></input>
  
          </div>
          <div className="mb-3">
            <label className="form-label">LastName</label>
            <input type="text" className="form-control" value={lastName}
              onChange={
                (e) => setlastName(e.target.value)
              } ></input>
          </div>

          <div className="mb-3">
            <label className="form-label">Total Balance</label>
            <input type="text" className="form-control" value={totalBalance}
             disabled/>
          </div>
          <button className="btn btn-primary" onClick={(e)=>SubmitEditForm(e)}>Submit</button>
        </form>
  
      </div>
    )
}

export default EditCustomer