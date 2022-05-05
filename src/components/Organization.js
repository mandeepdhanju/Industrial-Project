import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrganizationCreateForm from "./OrganizationCreateForm";
import OrganizationUpdateForm from "./OrganizationUpdateForm";
const axios = require("axios");
const path = "https://localhost:5001/api/";

function Organization() {
  const [orgs, setOrgs] = useState([]);
  const [orgObj, setOrgObj] = useState({});
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    async function getAllOrgs() {
      const response = await axios.get(path + "Organization");
      setOrgs(response.data);
    }
    getAllOrgs();
  }, []);

  function getBranchInfo(id, orgName) {
    let path = "/organization/" + id;
    navigate(path, {
      state: {
        orgsName: orgName
      },
    });
  }

  async function markInactive(id) {
    const response = await axios.delete(path + "Organization/" + id);
    console.log(response);

    //update again
  }

  function pushToArray(newOrgObj) {
    setOrgs([...orgs, newOrgObj]);
  }

  return (
    <div className="organization">
      {create ? (
        <OrganizationCreateForm
          pushToArray={pushToArray}
        ></OrganizationCreateForm>
      ) : (
        ""
      )}
      <button onClick={() => setCreate(!create)}>
        Create New Organization
      </button>
      <table>
        <thead>
          <tr>
            <th className="t-num">#</th>
            <th className="t-name">Organization</th>
            <th>Category</th>
            <th>SubCategory</th>
            <th>Number of Active Branches</th>
            <th>Number of Employees</th>
            <th>Website</th>
            <th className="t-actions">Actions</th>
          </tr>
        </thead>

        {orgs.map((org, index) => {
          return (
            <tbody key={org.organizationID}>
              <tr
                onClick={() => {
                  getBranchInfo(org.organizationID, org.organizationName);
                }}
              >
                <td>{index + 1}</td>
                <td>{org.organizationName}</td>
                <td>{org.category}</td>
                <td>{org.subCategory}</td>
                <td>{org.activeBranches}</td>
                <td>{org.numberOfEmployees}</td>
                <td onClick={(e) => e.stopPropagation()}>
                  {org.website ? <a href={org.website}>Website</a> : ""}
                </td>
                <td>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEdit(!edit);
                      setOrgObj(org);
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      markInactive(org.organizationID);
                    }}
                  >
                    {org.active ? "🟢" : "🔴"}
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>

      {edit ? (
        <OrganizationUpdateForm orgObj={orgObj}></OrganizationUpdateForm>
      ) : (
        ""
      )}
    </div>
  );
}

export default Organization;
