import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../layout/Navbar/Navbar'
import Paginate from '../../layout/Paginate/Paginate'

const Customer = () => {

  const [limit, setLimit] = useState(2);
  const [offset, setOffset] = useState(1);
  const [totalCount, setTotalCount] = useState(1);


    const [customer,setCustomer] = useState([])

    const navigateObject = new useNavigate()
    const userDetails = {
        id : useParams().id,
        role : useParams().role
    }
   

    //
    useEffect(()=>{
        console.log("use effect comes into effect");
        getAllUsers()
    },[limit, offset])

    const getAllUsers = async() =>{
        try {
        let params = {
          pageSize: limit,
          pageNo: offset - 1,
        }
      
        setCustomer([]);
        // get the data
         let respAll = await axios.get('http://localhost:8080/customer').catch((err) =>{
                alert("error occured")
                return 
            })

        let respPage = await axios.get(`http://localhost:8080/customer?pageNumber=${params.pageNo}&pageSize=${params.pageSize}`).catch((err) =>{
                alert("error occured")
                return 
            })

        console.log("seeting data "+respPage.data.length)

        // store the data
        setTotalCount(respAll.data.length)
        setCustomer(respPage.data)

        // display the data
        } catch (error) {
        console.log(error);
      }
        
    }
    const handleDeleteEdit = async (e) => {
        
        e.preventDefault()
        console.log("hitt")
      console.log(e.target.innerText)
      if (e.target.innerText == "DELETE") {
        const id = e.target.parentElement.parentElement.firstChild.innerText
        const response = await axios.delete(`http://localhost:8080/customer/${id}`).catch((err) =>{
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

    
    const customerRows = customer.map((customer,index) =>{
        
        return (     
        <tr key={customer.bankid}>

            <td>{customer.customerid}</td>
            <td>{customer.firstName}</td>
            <td>{customer.lastName}</td>
            <td>{customer.totalBalance}</td>
            <td>{customer.accounts.length}</td>
            <td><button type="button" className="btn btn-success editButton" onClick={(e)=>{handleDeleteEdit(e)}}>EDIT</button></td>
            <td><button type="button" className="btn btn-danger deleteButton" onClick={(e)=>{handleDeleteEdit(e)}}>DELETE</button></td>       
        </tr>
        )
    })
    const addCustomer = ()=>{
        navigateObject('addCustomer')
    }



  return (
    <>
    <Navbar user = {userDetails} />
    <div>AdminDashboard</div>

    
   
    <div className='container'>
   
    <div className="d-flex justify-content-end">
        <button className="btn btn-primary" onClick={addCustomer}>Add customer</button>
    </div>
   
    <table className="table">
  <thead>
    <tr>
      <th scope="col">Customer ID</th>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">totalBalance</th>
      <th scope="col">No. of accounts</th>
      <th scope="col" >Update</th>
      <th scope="col" >Delete</th>
      
    </tr>
  </thead>
  <tbody>
   {customerRows}
  </tbody>
</table>

<div className='d-flex justify-content-center'>

    {totalCount > 0 &&
              <Paginate totalCount={totalCount} limit={limit} offset={offset} setLimit={setLimit} setOffset={setOffset} />
            }

    </div>
    </div>

    </>
  )
}

export default Customer