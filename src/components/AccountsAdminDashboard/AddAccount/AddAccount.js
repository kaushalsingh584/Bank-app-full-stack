import axios from 'axios'
import React, { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const AddAccount = () => {
    const user = {
        role: useParams().role,
        id: useParams().id
    }
  const navigateObject = new useNavigate()
  const balanceRef = useRef()
  const SubmitEditForm = async(e)=>{
    e.preventDefault()
    console.log(balanceRef.current.value)
    const response = await axios.post(`http://localhost:8080/account`,{
    
      
        "balance": balanceRef.current.value,
       
        // "accounts" : [
        //     {

        //     },{

        //     }
        // ]
   

    }).catch((err) =>{
        alert("error occured")
        return 
    })
    navigateObject(`/admindashboard/${user.role}/${user.id}/accounts`)
    
}

    return (
        <>
        <div className='container'>
            <form>
                
                <div className="mb-3">
                    <label className="form-label">Balance</label>
                    <input type="text" className="form-control" 
                      ref={balanceRef}/>

                </div>
                
                <button className="btn btn-primary" onClick={SubmitEditForm}>Submit</button>
            </form>
            </div>
        </>
    )
}

export default AddAccount