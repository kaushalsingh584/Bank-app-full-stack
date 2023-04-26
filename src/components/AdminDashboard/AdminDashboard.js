import React, { useEffect, useState } from 'react'
import Navbar from '../../layout/Navbar/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Paginate from '../../layout/Paginate/Paginate'



const AdminDashboard = () => {
  //
  const [limit, setLimit] = useState(2);
  const [offset, setOffset] = useState(1);
  const [totalCount, setTotalCount] = useState(1);

  const [banks,setBanks] = useState([])

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
      
        setBanks([]);

        // get the data

        let respAll = await axios.get(`http://localhost:8080/bank`).catch((err) =>{
                alert("error occured")
                return 
            })

        let respPage = await axios.get(`http://localhost:8080/bank?pageNumber=${params.pageNo}&pageSize=${params.pageSize}`).catch((err) =>{
                alert("error occured")
                return 
            })

        setTotalCount(respAll.data.length)
        console.log("seeting data "+respPage.data.length)

        // store the data
        setBanks(respPage.data)
      } catch (error) {
        console.log(error);
      }
        // display the data
        
        
    }
    const handleDeleteEdit = async (e) => {
        
        e.preventDefault()
        console.log("hitt")
      console.log(e.target.innerText)
      if (e.target.innerText == "DELETE") {
        const id = e.target.parentElement.parentElement.firstChild.innerText
        const response = await axios.delete(`http://localhost:8080/bank/${id}`).catch((err) =>{
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

    
    const bankRows = banks.map((bank,index) =>{
        
        return (     
        <tr key={bank.bankid}>

            <td>{bank.bankid}</td>
            <td>{bank.fullname}</td>
            <td>{bank.abbreviation}</td>
            <td>{bank.accounts.length}</td>
            <td><button type="button" className="btn btn-success editButton" onClick={(e)=>{handleDeleteEdit(e)}}>EDIT</button></td>
            <td><button type="button" className="btn btn-danger deleteButton" onClick={(e)=>{handleDeleteEdit(e)}}>DELETE</button></td>       
        </tr>
        )
    })
    const addbank = ()=>{
        navigateObject('addbank')
    }



  return (
    <>
    <Navbar user = {userDetails} />
    <div>AdminDashboard</div>

    
   
    <div className='container'>
   
    <div className="d-flex justify-content-end">
        <button className="btn btn-primary" onClick={addbank}>Add Bank</button>
    </div>
   
    <table className="table">
  <thead>
    <tr>
      <th scope="col">Bank ID</th>
      <th scope="col">Full Name</th>
      <th scope="col">Abbreviation</th>
      <th scope="col">No. of accounts</th>
      <th scope="col" >Update</th>
      <th scope="col" >Delete</th>
      
    </tr>
  </thead>
  <tbody>
   {bankRows}
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

export default AdminDashboard