import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const AddBank = () => {
    const user = {
        role: useParams().role,
        id: useParams().id
    }
  const navigateObject = new useNavigate()
  const fullnameRef = useRef()
  const abbreviationRef = useRef()
  const SubmitEditForm = async(e)=>{
    e.preventDefault()
    console.log(fullnameRef.current.value)
    const response = await axios.post(`http://localhost:8080/bank`,{
    
      
        "fullname": fullnameRef.current.value,
        "abbreviation": abbreviationRef.current.value,
        // "accounts" : [
        //     {

        //     },{

        //     }
        // ]
   

    }).catch((err) =>{
        alert("error occured")
        return 
    })
    navigateObject(`/admindashboard/${user.role}/${user.id}/bank`)
    
}

    return (
        <>
        <div className='container'>
            <form>
                
                <div className="mb-3">
                    <label className="form-label">Fullname</label>
                    <input type="text" className="form-control" 
                      ref={fullnameRef}/>

                </div>
                <div className="mb-3">
                    <label className="form-label">Abbreviation</label>
                    <input type="text" className="form-control" 
                         ref={abbreviationRef} />
                </div>
                <button className="btn btn-primary" onClick={SubmitEditForm}>Submit</button>
            </form>
            </div>
        </>
    )
}

export default AddBank