import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import EmployeeCountUpdateForm from "./EmployeeCountUpdateForm"
import EmployeeCountAddForm from "./EmployeeCountAddForm"
const axios = require('axios')
const path = "https://localhost:5001/api/"


function EmployeeCount() {
  const [empCount, setEmpCount] = useState([])
  const [empCountObj, setEmpCountObj] = useState({})
  const [edit, setEdit] = useState(false)
  const [add, setAdd] = useState(false)

  let navigate = useNavigate();

  useEffect(() => {
    async function getAllEmpCount() {
      const response = await axios.get(path + "EmployeeCount")
      console.log(response.data)
      setEmpCount(response.data)
    }
    getAllEmpCount()
  }, [])

  async function updateCommunity() {
    const response = await axios.put(path + "EmployeeCount")
    console.log(response)
  }

  function getBranchInfo(id) {
    let path = "/employeeCount/" + id
    navigate(path)
  }

  return <div className="employeeCount">
      <div className="overview">
        <div className="heading">
            <h3>EmployeeCount</h3>
            <button onClick={() => { setAdd(true); setEdit(false); setEmpCountObj(empCount) }}>Add EmployeeCount</button>
        </div>
      
    <table>
      <thead><tr>
        <th>#</th>
        <th>EmployeeCount</th>
        <th>Actions</th> 
      </tr></thead>

      {empCount.map((employeeCount, index) => {
        return <tbody key={(employeeCount.employeeCountID)}>

          <tr>
            <td>{index + 1}</td>
            <td>{employeeCount.employeeCountRange}</td>
            <td className="actions">
              <button onClick={() => { setEdit(true); setAdd(false); setEmpCountObj(employeeCount) }}>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        </tbody>
      })}
    </table>
   
    {edit ? <EmployeeCountUpdateForm empCountObj={empCountObj}></EmployeeCountUpdateForm> : ""}
    {add ? <EmployeeCountAddForm empCountObj={empCountObj}></EmployeeCountAddForm> : ""}
  </div >
  </div>
}

export default EmployeeCount;