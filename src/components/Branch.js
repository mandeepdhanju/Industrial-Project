import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Organization from "./Organization";
import OrganizationUpdateForm from "./OrganizationUpdateForm";
import BranchCreateForm from "./BranchCreateForm";

const axios = require("axios");
const path = "https://localhost:5001/api/";

function Branch() {
  const { organizationID } = useParams();
  const { organizationName } = useParams();
  const [orgs, setOrgs] = useState([]);
  const [branch, setBranch] = useState([]);
  const [orgObj, setOrgObj] = useState({});
  const [branchObj, setBranchObj] = useState({});
  const [edit, setEdit] = useState(false);
  // const id = useRef ("organizationID")
  // const {organizationID} = useParams();

  const [create, setCreate] = useState(false);

  const location = useLocation();

  let navigate = useNavigate();

  // useEffect(() => {
  //     async function getAllBranch() {
  //       const response = await axios.get(path + "Branch")
  //       setOrgs(response.data)
  //     }
  //     getAllBranch()
  //   }, [])

  useEffect(() => {
    async function getAllBranch() {
      const response = await axios.get(path + "Branch/" + organizationID);
      console.log(response.data);
      setBranch(response.data);
    }
    getAllBranch();
  }, []);

  async function markInactive(id) {
    const response = await axios.delete(path + "Branch/" + organizationID);
    console.log(response);

    //update again
  }

  function getBranchInfo(id) {
    let path = "/branch/" + id;
    navigate(path);
  }

  function pushToArray(newBranchObj) {
    setBranch([...branch, newBranchObj]);
  }
  return (
    <div className="branches">
      {create ? (
        <BranchCreateForm pushToArray={pushToArray}></BranchCreateForm>
      ) : (
        ""
      )}
      <button onClick={() => setCreate(!create)}>Create New Branch</button>

      <h1>{location.state.orgsName}</h1>
      {/* {console.log("hello from here", location)} */}
      <table>
        <thead>
          <tr>
            <th className="t-num">#</th>
            <th className="t-community">Community</th>
            <th className="t-branch">Branch Name</th>
            {/* <th className="t-branchId">Branch ID</th> */}
            <th className="t-busAdd">Business Address</th>
            <th className="t-busSt">business Street</th>
            <th className="t-busCity">business City</th>
            <th className="t-busPbusCityrov">business Province</th>
            <th className="t-busPost">business PostalCode</th>
            <th className="t-mailAdd">Mailing Address</th>
            <th className="t-mailSt">mailing Street</th>
            <th className="t-mailCity">mailing City</th>
            <th className="t-mailProv">mailing Province</th>
            <th className="t-mailPost">mailing PostalCode</th>
            <th className="t-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {branch.length > 0 && console.log(branch)}
          {branch.length > 0 &&
            branch.map((branch, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{branch.community}</td>
                <td>{branch.branchName}</td>
                {/* <td>{branch.branchID}</td> */}
                <td>
                  {branch.businessAddress + " " + branch.businessAddress2}
                </td>
                <td>{branch.businessStreet}</td>
                <td>{branch.businessCity}</td>
                <td>{branch.businessProvince}</td>
                <td>{branch.businessPostalCode}</td>
                <td>{branch.mailingAddress + " " + branch.mailingAddress2}</td>
                <td>{branch.mailingStreet}</td>
                <td>{branch.mailingCity}</td>
                <td>{branch.mailingProvince}</td>
                <td>{branch.mailingPostalCode}</td>
                {/* <td>{branch.community}</td> */}

                <td>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEdit(!edit);
                      setOrgObj(orgs);
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      markInactive(branch.branchID);
                    }}
                  >
                    {branch.active ? "🟢" : "🔴"}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>

   
      </table>
      {edit ? (
        <OrganizationUpdateForm orgObj={orgObj}></OrganizationUpdateForm>
      ) : (
        ""
      )}
    </div>
  );
}

export default Branch;
