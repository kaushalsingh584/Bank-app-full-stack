import axios from 'axios'
import React, { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const AddCustomer = () => {
    const user = {
        role: useParams().role,
        id: useParams().id
    }
  const navigateObject = new useNavigate()
  const firstNameRef = useRef()
  const lastNameRef = useRef()

  const SubmitEditForm = async(e)=>{
    e.preventDefault()
    console.log(firstNameRef.current.value)
    const response = await axios.post(`http://localhost:8080/customer`,{
    
      
        "firstName": firstNameRef.current.value,
        "lastName": lastNameRef.current.value,
        "totalBalance" : 0,
        "role": "user"
        // "accounts" : [
        //     {

        //     },{

        //     }
        // ]
   

    }).catch((err) =>{
        alert("error occured")
        return 
    })
    navigateObject(`/admindashboard/${user.role}/${user.id}/customer`)
    
}

    return (
        <>
        <div className='container'>
            <form>
                
                <div className="mb-3">
                    <label className="form-label">FirstName</label>
                    <input type="text" className="form-control" 
                      ref={firstNameRef}/>

                </div>
                <div className="mb-3">
                    <label className="form-label">LastName</label>
                    <input type="text" className="form-control" 
                         ref={lastNameRef} />
                </div>
                <button className="btn btn-primary" onClick={SubmitEditForm}>Submit</button>
            </form>
            </div>
        </>
    )
}

export default AddCustomer