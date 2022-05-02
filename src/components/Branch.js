import React from 'react'
import { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom'

const axios = require('axios')
const path = "https://localhost:5001/api/community"

function Branch() {
    const { organizationID } = useParams()
    const [orgs, setOrgs] = useState([])
    const [orgObj, setOrgObj] = useState({})
    const [edit, setEdit] = useState(false)
    const [create, setCreate] = useState(false)

    let navigate = useNavigate();

    useEffect(() => {
        async function getAllOrgs() {
          const response = await axios.get(path + "Organization")
          setOrgs(response.data)
        }
        getAllOrgs()
      }, [])

    async function markInactive(id) {
    const response = await axios.delete(path + "Organization/" + id)
    console.log(response)

    //update again
    }

    function getBranchInfo(id) {
        let path = "/organization/" + id
        navigate(path)
      }

    function pushToArray(newOrgObj) {
    setOrgs([...orgs, newOrgObj])
    }
    return (
    <div className='branches'>
        <h1>Org Name {organizationID}</h1>
        <table>
        <thead><tr>
          <th className="t-num">#</th>
          <th className="t-name">Branches</th>
          <th className="t-address">Address</th>
          <th className='t-community'>Community</th>
          <th className='t-address'>Address</th>
          <th className='t-community'>Community</th>
          <th className='t-address'>Address</th>
          <th className='t-community'>Community</th>
          <th className='t-actions'>Actions</th>
        </tr></thead>
        <tr>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
        </tr>
        <tr>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
        </tr>
        <tr>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
        </tr>
        {orgs.map((org, index) => {
          return <tbody key={(org.organizationID)}>
  
            <tr onClick={() => { getBranchInfo(org.organizationID) }}>
              <td>{index + 1}</td>
              <td>{org.branchName}</td>
              <td>{org.address}</td>
              <td>{org.community}</td>
              <td>
                <button onClick={(e) => { e.stopPropagation(); setEdit(!edit); setOrgObj(org) }}>✏️</button>
                <button onClick={(e) => { e.stopPropagation(); markInactive(org.organizationID) }}>{org.active ? "🟢" : "🔴"}</button>
              </td>
            </tr>
          </tbody>
        })}
      </table>
    </div>
    )
}

export default Branch