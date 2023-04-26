import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigateObject = new useNavigate()


    const [users,setUsers] = useState([])
    const userRef = useRef()
    // const roleRef = useRef()
    const [role, setRole] = useState(null);
    useEffect(()=>{
        console.log("use effect comes into effect");
        getAllCustomers()
    },[])

    const useRefExample = async(e)=>{
        e.preventDefault();
        const user = {
            id : userRef.current.value,
            role : role
        }
            console.log(user.role)
            console.log(user.id)
    
            if(user.role == "" || user.id == "")
            {
                alert("username or password is empty")
                return
            }  
            if (user.role === "admin") {
                //navigate to admin dashboard
                navigateObject(`/admindashboard/${user.role}/${user.id}/bank`)
                return
            }
            //navigate to userDashboard
            navigateObject(`/userdashboard/${user.role}/${user.id}/accounts`)
            return
    
       }

    const getAllAdmin = async() =>{
        let resp = await axios.get('http://localhost:8080/admin').catch((err) =>{
                alert("error occured")
                return 
            })
        console.log("seeting data "+resp.data)
        const userRadio = document.getElementById('inlineRadio1')
        userRadio.checked = true
        setRole("admin")
        setUsers(resp.data)
    }

        const getAllCustomers = async() =>{
        let resp = await axios.get('http://localhost:8080/customer').catch((err) =>{
                alert("error occured in customer")
                return 
            })
        console.log("seeting data "+resp.data)
        const userRadio = document.getElementById('inlineRadio2')
        userRadio.checked = true
        setRole("user")
        setUsers(resp.data)
    }

    const userOptions = users.map((user,index) =>{
        return (
       
        <option key={user.customerid} value = {user.customerid}>id: {user.customerid}, Name: {user.firstName} {user.lastName}</option>
        )
    })
    return (
        <>
            <div className='container mt-4 p-4'>
                <form onSubmit={useRefExample}>
                    <div>Login</div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="admin"  onChange={getAllAdmin}/>
                    <label className="form-check-label" htmlFor="inlineRadio1">Admin</label>
                </div>
                
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="user"  onChange={getAllCustomers}/>
                    <label className="form-check-label" htmlFor="inlineRadio2">User</label>
                </div>

                <br />
                <label >Name</label>
                <select className="form-select" aria-label="Default select example" ref={userRef} >
                    {/* <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option> */}
                    {userOptions}
                </select>
            <br/>
            <button type= "submit" className='btn btn-primary'>Submit</button>
            </form>
            </div>
        </>
    )
}

export default Login