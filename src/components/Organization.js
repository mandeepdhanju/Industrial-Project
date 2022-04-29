import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import OrganizationUpdateForm from "./OrganizationUpdateForm"
const axios = require('axios')
const path = "https://localhost:5001/api/community"
// const path = "https://localhost:5001/swagger/index.html"

function Organization() {
  const [orgs, setOrgs] = useState([])
  const [orgObj, setOrgObj] = useState({})
  const [edit, setEdit] = useState(false)

  let navigate = useNavigate();

  useEffect(() => {
    async function getAllOrgs() {
      const response = await axios.get(path + "Organization")
      setOrgs(response.data)
    }
    getAllOrgs()
  }, [])

  async function updateOrg() {
    const response = await axios.put(path + "Organization")
    console.log(response)
  }

  function getBranchInfo(id) {
    let path = "/organization/" + id
    navigate(path)
  }

  return <div className="organization">
    <table>
      <thead><tr>
        <th>#</th>
        <th>Organization</th>
        <th>Community</th>
        {/* <th>SubCategory</th> */}
        <th>Number of Active Branches</th>
        <th>Number of Emphoyees</th>
        <th>Actions</th>
      </tr></thead>

      {orgs.map((org, index) => {
        return <tbody key={(org.organizationID)}>

          <tr onClick={() => { getBranchInfo(org.organizationID) }}>
            <td>{index + 1}</td>
            <td>{org.organizationName}</td>
            <td>{org.activeBranches}</td>
            <td>{org.numberOfEmployees}</td>
            <td>{org.subCategory}</td>
            <td>
              <button onClick={() => { setEdit(true); setOrgObj(org) }}>✏️</button>
              <button>🗑️</button>
            </td>
          </tr>

        </tbody>
      })}
    </table>
    {edit ? <OrganizationUpdateForm orgObj={orgObj}></OrganizationUpdateForm> : ""}
  </div >
}

export default Organization;
