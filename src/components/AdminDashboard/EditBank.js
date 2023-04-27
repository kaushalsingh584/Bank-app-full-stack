import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const EditBank = () => {

  const navigateObject = new useNavigate()
  const user = {
    id : useParams().id,
    role : useParams().role,
    bankid : useParams().bankid
  }

  const [fullname, setFullname] = useState("Bank name")
  const [abbreviation, setAbbreviation] = useState("abbreviation")



  const handleEditForm = async (e) => {
    const response = await axios.get(`http://localhost:8080/bank/${user.bankid}`).catch((err) => {
      alert("error occured")
      return
    })

    if (!response.data) {
      alert("No data found")
      return
    }
    console.log(response);
    setFullname(response.data.fullname)
    setAbbreviation(response.data.abbreviation)
    console.log("fullname: " + fullname + abbreviation);
  }

  const SubmitEditForm = async (e) => {

    e.preventDefault()
    const response = await axios.put(`http://localhost:8080/bank`, {
      "bankid": user.bankid,
      "fullname": fullname,
      "abbreviation": abbreviation

    }).catch((err) => {
      alert("error occured")
      return
    })

    navigateObject(`/admindashboard/${user.role}/${user.id}/bank`)
    console.log("reached");
  }

  useEffect(() => {
    console.log("use effect comes into effect edit form")
    handleEditForm()
  },[])

  return (
    <div className="container">

      <form>
        <div className="mb-3">
          <label className="form-label">Bank ID</label>
          <input type="text" className="form-control" value={user.bankid} />
        </div>
        <div className="mb-3">
          <label className="form-label">Fullname</label>
          <input type="text" className="form-control" value={fullname}
            onChange={
              (e) =>  setFullname(e.target.value) 
            } />

        </div>
        <div className="mb-3">
          <label className="form-label">Abbreviation</label>
          <input type="text" className="form-control" value={abbreviation}
            onChange={
              (e) => setAbbreviation(e.target.value)
            } />
        </div>
        <button className="btn btn-primary" onClick={(e) =>SubmitEditForm(e)}>Submit</button>
      </form>

    </div>
  )
}

export default EditBank