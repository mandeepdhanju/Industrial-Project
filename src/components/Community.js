import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import CommunityUpdateForm from "./CommunityUpdateForm"
import CommunityAddForm from "./CommunityAddForm"
const axios = require('axios')
const path = "https://localhost:5001/api/"


function Community() {
  const [community, setCommunity] = useState([])
  const [commObj, setCommObj] = useState({})
  const [edit, setEdit] = useState(false)
  const [add, setAdd] = useState(false)

  let navigate = useNavigate();

  useEffect(() => {
    async function getAllCommunities() {
      const response = await axios.get(path + "Community")
      console.log(response.data)
      setCommunity(response.data)
    }
    getAllCommunities()
  }, [])

  async function updateCommunity() {
    const response = await axios.put(path + "Community")
    console.log(response)
  }

  function getBranchInfo(id) {
    let path = "/community/" + id
    navigate(path)
  }

  return <div className="community">
      <div className="overview">
        <div className="heading">
            <h3>Community</h3>
            <button onClick={() => { setAdd(true); setEdit(false); setCommObj(community) }}>Add Community</button>
        </div> 
      
    <table>
      <thead><tr>
        <th>#</th>
        <th>Community</th>
        <th>Actions</th> 
      </tr>
      </thead>

      {community.map((community, index) => {
        return <tbody key={(community.communityID)}>

          <tr>
            <td>{index + 1}</td>
            <td>{community.communityName}</td>
            <td className="actions">
              <button onClick={() => { setEdit(true); setAdd(false); setCommObj(community) }}>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        </tbody>
      })}
    </table>
   
    {edit ? <CommunityUpdateForm commObj={commObj}></CommunityUpdateForm> : ""}
    {add ? <CommunityAddForm commObj={commObj}></CommunityAddForm> : ""}
  </div >
  </div>
}

export default Community;