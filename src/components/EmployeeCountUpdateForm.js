import axios from "axios";
import { useState } from "react";

function EmployeeCountUpdateForm({ handleFormSubmit, closeModal, selectedEmpCount }) {
    const [empCountRange, setEmpCountRange] = useState({})
    const PATH = process.env.REACT_APP_API_URL;
    const [errorMsg, setErrorMsg] = useState()

    async function addEmpCount(e) {
        e.preventDefault();
        const response = await axios.put(PATH + "EmployeeCount", {
          employeeCountID: selectedEmpCount.employeeCountID,
          employeeCountRange: empCountRange
        })
        if (response.data.error) {
          setErrorMsg(response.data.error)
          return
        }
        handleFormSubmit(response.data.value)
      }
  

    return (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: 5000,
          backgroundColor: "rgba(0, 0, 0, 0.75)",
        }}
          onClick={closeModal}>
    
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            backgroundColor: "white",
            padding: "1rem",
            zIndex: 5001,
          }}
            onClick={(e) => { e.stopPropagation() }}
          >
            <form onSubmit={addEmpCount}>
              {errorMsg ? <div><p>{errorMsg}</p></div> : null}
              <label htmlFor="empCountRange">Employee Count Range:</label>
              <input
                type="text"
                id="empCountRange"
                required
                placeholder={selectedEmpCount.empCountRange}
                onChange={(e) => setEmpCountRange(e.target.value.trim())}></input>
              <br />
              <button type="submit">Update</button>
            </form >
          </div>
        </div>
      )
    }

export default EmployeeCountUpdateForm