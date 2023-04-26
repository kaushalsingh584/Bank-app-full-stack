import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const EditBank = () => {
  const id = useParams().bankid;

  const [fullname, setFullname] = useState("Bank name")
  const [abbreviation, setAbbreviation] = useState("abbreviation")



  const handleEditForm = async (e) => {
    const response = await axios.get(`http://localhost:8080/bank/${id}`).catch((err) => {
      alert("error occured")
      return
    })

    if (!response.data) {
      alert("No data found")
      return
    }

    setFullname(response.data.fullname)
    setAbbreviation(response.data.abbreviation)
    console.log("fullname: " + fullname);
  }

  const SubmitEditForm = async (e) => {

    const response = await axios.put(`http://localhost:8080/bank`, {
      "bankid": `${id}`,
      "fullname": fullname,
      "abbreviation": abbreviation

    }).catch((err) => {
      alert("error occured")
      return
    })


  }

  useEffect(() => {
    console.log("use effect comes into effect edit form")
    handleEditForm()
  },[])

  return (
    <div className="modal-dialog modal-dialog-centered">

      <form>
        <div className="mb-3">
          <label className="form-label">Bank ID</label>
          {/* <input type="text" className="form-control" value={id} /> */}
        </div>
        <div className="mb-3">
          <label className="form-label">Fullname</label>
          <input type="text" className="form-control" placeholder={fullname}
            onChange={
              (e) =>  setFullname(e.target.value) 
            } />

        </div>
        <div className="mb-3">
          <label className="form-label">Abbreviation</label>
          <input type="text" className="form-control" placeholder={abbreviation}
            onChange={
              (e) => setAbbreviation(e.target.value)
            } />
        </div>
        <button className="btn btn-primary" onClick={SubmitEditForm}>Submit</button>
      </form>

    </div>
  )
}

export default EditBank