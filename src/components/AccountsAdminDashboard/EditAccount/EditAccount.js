import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const EditAccount = () => {
    const id = useParams().accountid;

    const [balance, setBalance] = useState(0)
    // const [abbreviation, setAbbreviation] = useState("abbreviation")
  
  
  
    const handleEditForm = async (e) => {
      const response = await axios.get(`http://localhost:8080/account/${id}`).catch((err) => {
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
  
      const response = await axios.put(`http://localhost:8080/account`, {
        "accountNo": `${id}`,
        "balance": balance       
  
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
            <label className="form-label">Account ID</label>
            <input type="text" className="form-control" value={id} />
          </div>
          <div className="mb-3">
            <label className="form-label">Balance</label>
            <input type="text" className="form-control" placeholder={balance}
              onChange={
                (e) =>  setBalance(e.target.value) 
              } />
  
          </div>
         
       
          <button className="btn btn-primary" onClick={SubmitEditForm}>Submit</button>
        </form>
  
      </div>
    )
}

export default EditAccount