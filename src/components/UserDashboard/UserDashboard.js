import React, { useEffect, useState } from 'react'
import Navbar from '../../layout/Navbar/Navbar'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './UserDashboard.css';
import { useNavigate, useParams } from 'react-router-dom'

import axios from 'axios'


const UserDashboard = () => {

  // const [modalShow, setModalShow] = useState(false);
  const [account, setAccount] = useState([])
  const [credit, setCredit] = useState([])
  const [debit, setDebit] = useState([])
  const [totalBalance, setTotalCount] = useState(0)
  const [firstName, setFirstName] = useState("")
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigateObject = new useNavigate()
  const userDetails = {
    id: useParams().id,
    role: useParams().role
  }


  //
  useEffect(() => {
    console.log("use effect comes into effect");
    getAllUsers()
    handleTotalBalance()
  }, [])

  const handlePassbook = async (e) => {
        
    e.preventDefault()
    console.log("hitt")
  console.log(e.target.innerText)
  if (e.target.innerText == "Passbook") {
    const id = e.target.parentElement.parentElement.firstChild.innerText
    console.log("account id ",id)
    navigateObject(`passbook/${id}`)
  }

}

  const getAllUsers = async () => {

    // get the data
    let resp = await axios.get(`http://localhost:8080/customer/${userDetails.id}`).catch((err) => {
      alert("error occured")
      return
    })

    console.log("seeting data " + resp.data)

    // store the data
    setAccount(resp.data.accounts)
    
    console.log({show});
  

    // display the data


  }



  const accountRows = account.map((account, index) => {

    return (
      <tr key={account.accountNo}>

        <td>{account.accountNo}</td>
        <td>{account.balance}</td>
        {/* <td>`${id}`</td> */}
        <td><button type="button" className="btn btn-success editButton" onClick={(e)=>{
          {handlePassbook(e)}
          // {handleShow(e)}

          }} >Passbook</button></td>

      </tr>
    )
  })

  const handleTotalBalance = async() =>{

    
    const respone = await axios.get(`http://localhost:8080/customer/totalBalance/${userDetails.id}`).catch((err) => {
      alert("error occured")
      return
    })

    setTotalCount(respone.data.totalBalance)
    setFirstName(respone.data.firstName)
  
 
    console.log(respone)


  }


  return (
    <>
      <Navbar user={userDetails} />
      <div>UserDashboard</div>
      <div className='container'>

      <div className="d-flex justify-content-end">
      {/* <button className="btn btn-primary peronsalDetail" disabled>CustomerId: {userDetails.id} Name: {firstName}</button> */}
      <button className="btn btn-primary totalBalance" disabled> Total Balace: Rs {totalBalance}</button>
      </div>
     
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Account No</th>
              <th scope="col">Balance</th>
              {/* <th scope="col">Bank ID</th> */}
              <th scope="col" >Passbook</th>
            </tr>
          </thead>
          <tbody>
            {accountRows}
          </tbody>
        </table>
      </div>
      {/* <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Transaction ID</th>
              <th scope="col">SenderID</th>
              <th scope="col" >ReceiverID</th>
              <th scope="col" >Amount</th>
              <th scope="col" >Type</th>
            </tr>
          </thead>
          <tbody>
            {creditRows}
          </tbody>
        </table>
   
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal> */}

    </>



  )

}

export default UserDashboard