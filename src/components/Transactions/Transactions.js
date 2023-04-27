import React from 'react'
import { useParams } from 'react-router-dom'
import './Transactions.css';
import Navbar from '../../layout/Navbar/Navbar'
import withdrawimg from '../../assets/withdraw.png'
import depositimg from '../../assets/deposit.jpg'
import transferimg from '../../assets/transferpng.png'

const Transactions = () => {

  const user = {
    id: useParams().id,
    role: useParams().role
  }
  return (
    <>
      <Navbar user={user} />
      <p className='text-center'><h2>Choose the type of transaction, you want to make </h2></p>
      <div className='container d-flex justify-content-center'>

        <div className="card"  >
          <img src={depositimg} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Deposit Money</h5>
            {/* <p  className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
            <a href="addtransaction/deposit" className="btn btn-primary">Deposit</a>
          </div>
        </div>
        <div className="card"  >
          <img src={withdrawimg} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">withdraw Money</h5>
            {/* <p  className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
            <a href="addtransaction/withdraw" className="btn btn-primary">withdraw</a>
          </div>
        </div><div className="card"  >
          <img src={transferimg} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Transfer</h5>
            {/* <p  className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
            <a href="addtransaction/transfer" className="btn btn-primary">Transfer</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Transactions