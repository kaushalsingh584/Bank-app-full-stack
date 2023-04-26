import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../layout/Navbar/Navbar'
import axios from 'axios'

const Accounts = () => {
  
    const [account,setAccount] = useState([])

    const navigateObject = new useNavigate()
    const userDetails = {
        id : useParams().id,
        role : useParams().role
    }
   

    //
    useEffect(()=>{
        console.log("use effect comes into effect");
        getAllUsers()
    },[])

    const getAllUsers = async() =>{

        // get the data
        let resp = await axios.get('http://localhost:8080/account').catch((err) =>{
                alert("error occured")
                return 
            })

        console.log("seeting data "+resp.data)

        // store the data
        setAccount(resp.data)

        // display the data
        
        
    }
    const handleDeleteEdit = async (e) => {
        
        e.preventDefault()
        console.log("hitt")
      console.log(e.target.innerText)
      if (e.target.innerText == "DELETE") {
        const id = e.target.parentElement.parentElement.firstChild.innerText
        const response = await axios.delete(`http://localhost:8080/account/${id}`).catch((err) =>{
            alert("error occured")
            return 
        })
        e.target.parentElement.parentElement.remove(e.target.parentElement.parentElement)
      }
      else if(e.target.innerText == "EDIT")
      {
        const id = e.target.parentElement.parentElement.firstChild.innerText
        navigateObject(`${id}`)
       
   
       return
      }
  }

    
    const accountRows = account.map((account,index) =>{
        
        return (     
        <tr key={account.bankid}>

            <td>{account.accountNo}</td>
            <td>{account.balance}</td>
            <td><button type="button" className="btn btn-success editButton" onClick={(e)=>{handleDeleteEdit(e)}}>EDIT</button></td>
            <td><button type="button" className="btn btn-danger deleteButton" onClick={(e)=>{handleDeleteEdit(e)}}>DELETE</button></td>       
        </tr>
        )
    })
    const addAccount = ()=>{
        navigateObject('addaccount')
    }



  return (
    <>
    <Navbar user = {userDetails} />
    <div>AdminDashboard</div>

    
   
    <div className='container'>
   
    <div className="d-flex justify-content-end">
        <button className="btn btn-primary" onClick={addAccount}>Add Account</button>
    </div>
   
    <table className="table">
  <thead>
    <tr>
      <th scope="col">Account ID</th>
     
      <th scope="col">Balance</th>
    
      <th scope="col" >Update</th>
      <th scope="col" >Delete</th>
      
    </tr>
  </thead>
  <tbody>
   {accountRows}
  </tbody>
</table>
    </div>

    </>
  )
}

export default Accounts