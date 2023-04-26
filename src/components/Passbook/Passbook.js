import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../layout/Navbar/Navbar'
import Paginate from '../../layout/Paginate/Paginate'



const Passbook = () => {

    const [limit, setLimit] = useState(2);
    const [offset, setOffset] = useState(1);
    const [totalCount, setTotalCount] = useState(1);

    const user = {
        id: useParams().id,
        role: useParams().role,
        accountId: useParams().accountid
    }
    const [credit, setCredit] = useState([])
    const [debit, setDebit] = useState([])
    const [transactions, setTansaction] = useState([])

    const handlePassbook = async (e) => {
        try {
            let params = {
                pageSize: limit,
                pageNo: offset - 1,
            }

            setTansaction([])
            console.log("hitt")
            console.log("account id ", user.accountId)
            const responseAll = await axios.get(`http://localhost:8080/transaction/accountId/${user.accountId}`).catch((err) => {
                alert("error occured")
                return
            })

            const responsePage = await axios.get(`http://localhost:8080/transaction/accountId/${user.accountId}?pageNumber=${params.pageNo}&pageSize=${params.pageSize}`).catch((err) => {
                alert("error occured")
                return
            })
            // setCredit(response.data.credit)
            // setDebit(response.data.debit)
            setTansaction(responsePage.data)
            setTotalCount(responseAll.data.length)
            console.log(credit)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log("use effect comes into effect in passbook");
        handlePassbook()

    }, [limit, offset])

    const transactionsRows = transactions.map((transaction, index) => {
        return (
            <tr>
                <td>{transaction.transactionId}</td>
                <td>{transaction.senderAccNo}</td>
                <td>{transaction.receiverAccNo}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.transactionType}</td>
                <td>{transaction.created_at}</td>
            </tr>
        )
    })

    const debitRows = debit.map((transaction, index) => {
        return (
            <tr>
                <td>{transaction.transactionId}</td>
                <td>{transaction.senderAccNo}</td>
                <td>{transaction.receiverAccNo}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.transactionType}</td>
                <td>{transaction.created_at}</td>
            </tr>
        )
    })




    return (
        <>
            <Navbar user={user} />
            <div className='container'>
                <h2>Passbook</h2>
                <br />
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Transaction ID</th>
                            <th scope="col">SenderID</th>
                            {/* <th scope="col">Bank ID</th> */}
                            <th scope="col" >ReceiverID</th>
                            <th scope="col" >Amount</th>
                            <th scope="col" >Type</th>
                            <th scope="col" >TimeStamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactionsRows}
                    </tbody>
                </table>

                <br />
                {/* <h3>Debit</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Transaction ID</th>
                        <th scope="col">SenderID</th>
                        <th scope="col" >ReceiverID</th>
                        <th scope="col" >Amount</th>
                        <th scope="col" >Type</th>
                        <th scope="col" >TimeStamp</th>
                    </tr>
                </thead>
                <tbody>
                    {debitRows}
                </tbody>
            </table> */}
                <div className='d-flex justify-content-center'>

                    {totalCount > 0 &&
                        <Paginate totalCount={totalCount} limit={limit} offset={offset} setLimit={setLimit} setOffset={setOffset} />
                    }

                </div>
            </div>
        </>
    )
}

export default Passbook

