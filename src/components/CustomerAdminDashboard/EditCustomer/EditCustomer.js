import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const EditCustomer = () => {
    const id = useParams().customerid;

    const [firstName, setFirstName] = useState("first name")
    const [lastName, setlastName] = useState("last name")
    const [totalBalance, setTotalBaalance] = useState(0)
  
  
  
    const handleEditForm = async (e) => {
      const response = await axios.get(`http://localhost:8080/customer/${id}`).catch((err) => {
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
  
      const response = await axios.put(`http://localhost:8080/customer`, {
        "customerid" : `${id}`,
        "firstName" : firstName,
        "lastName" :lastName,
        "totalBalance" : totalBalance,
        "role": "user"
  
      }).catch((err) => {
        alert("error occured")
        return
      })
  
  
    }
  
    useEffect(() => {
      console.log("use effect comes into effect edit form")
      handleEditForm()
    },[])
  
    return (
      <div className="modal-dialog modal-dialog-centered">
  
        <form>
          <div className="mb-3">
            <label className="form-label">Customer ID</label>
            <input type="text" className="form-control" value={id} disabled/>
          </div>
          <div className="mb-3">
            <label className="form-label">FirstName</label>
            <input type="text" className="form-control" placeholder={firstName}
              onChange={
                (e) =>  setFirstName(e.target.value) 
              } />
  
          </div>
          <div className="mb-3">
            <label className="form-label">LastName</label>
            <input type="text" className="form-control" placeholder={lastName}
              onChange={
                (e) => setlastName(e.target.value)
              } />
          </div>

          <div className="mb-3">
            <label className="form-label">Total Balance</label>
            <input type="text" className="form-control" placeholder={totalBalance}
             disabled/>
          </div>
          <button className="btn btn-primary" onClick={SubmitEditForm}>Submit</button>
        </form>
  
      </div>
    )
}

export default EditCustomer