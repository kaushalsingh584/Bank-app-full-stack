import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const AddAccount = () => {
    const user = {
        role: useParams().role,
        id: useParams().id
    }
  const navigateObject = new useNavigate()
  const [banks,setBanks] = useState([])

  const balanceRef = useRef()
  const bankRef = useRef()

  const SubmitEditForm = async(e)=>{
    e.preventDefault()
    console.log(bankRef.current.value)
    const bankobj = JSON.parse(bankRef.current.value)
    console.log(bankobj.accounts);
        const response = await axios.put(`http://localhost:8080/bank/addaccount`,{
    
            "bankid": bankobj.bankid,
            "fullname":bankobj.fullname,
            "abbreviation": bankobj.abbreviation,
            "accounts" : [
               
                {
                    "balance": balanceRef.current.value,
                }
            ]
        
       
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
    const getAllBanks=async(e)=>{
        let respAll = await axios.get(`http://localhost:8080/bank`).catch((err) =>{
            alert("error occured")
            return 
        }).catch((err)=>{
            console.log("error occured while fetching bank")
            return
        })
        setBanks(respAll.data)
    }
    useEffect(()=>{
        getAllBanks()
    },[])
    // const handleSelectChange = (event) => {
    //     const value = event.target.value;
    //     setSelectedOption(value);
    //   };
    const banksData = banks.map((bank, index)=>{
        return(
            <option key={bank} value = {JSON.stringify(bank)}>id: {bank.bankid}, Name: {bank.fullname}</option>
        )
    })
    return (
        <>
        <div className='container'>
            <form>
                
            <label >Select Bank</label>
                <select className="form-select" aria-label="Default select example" ref={bankRef} >
                    {/* <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option> */}
                    {banksData}
                </select>
                <div className="mb-3">
                    <label className="form-label">Balance</label>
                    <input type="text" className="form-control" defaultValue={1000}
                      ref={balanceRef}/>

                </div>
                
                <button className="btn btn-primary" onClick={SubmitEditForm}>Submit</button>
            </form>
            </div>
        </>
    )
}

export default AddAccount