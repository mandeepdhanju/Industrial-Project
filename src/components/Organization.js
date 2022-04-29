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
<<<<<<< HEAD
        <th>#</th>
        <th>Organization</th>
        <th>Community</th>
        {/* <th>SubCategory</th> */}
=======
        <th className="sticky-col org-num">#</th>
        <th className="sticky-col org-name">Organization</th>
        <th>SubCategory</th>
>>>>>>> 9ecc21fe3ba5d78b7bb25e40e4913d881f66d6f7
        <th>Number of Active Branches</th>
        <th>Number of Employees</th>
        <th>Status</th>
        <th>Actions</th>
      </tr></thead>

      {orgs.map((org, index) => {
        return <tbody key={(org.organizationID)}>

          <tr onClick={() => { getBranchInfo(org.organizationID) }}>
            <td className="sticky-col org-num">{index + 1}</td>
            <td className="sticky-col org-name">{org.organizationName}</td>
            <td>{org.activeBranches}</td>
            <td>{org.numberOfEmployees}</td>
            <td>{org.subCategory}</td>
            <td>{org.active}</td>
            <td>
              <button onClick={() => { setEdit(true); setOrgObj(org) }}>✏️</button>
            </td>
          </tr>
        </tbody>
      })}
    </table>
    {edit ? <OrganizationUpdateForm orgObj={orgObj}></OrganizationUpdateForm> : ""}
  </div >
}

export default Organization;
