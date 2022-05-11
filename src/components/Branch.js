import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ReactDOM from 'react-dom';
import BranchUpdateForm from "./BranchUpdateForm";
import BranchDelete from "./BranchDelete";
import Comment from "./Comment";
import BranchCreateForm from "./BranchCreateForm";

function Branch() {
  const portalElement = document.getElementById("modal");

  const PATH = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const location = useLocation();
  const { organizationID } = useParams()

  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState();

  //Show Edit Form State
  const [toggleEditForm, setToggleEditForm] = useState(false);
  //Show Create Popup
  const [toggleCreate, setToggleCreate] = useState(false);
  //Show Delete Popup
  const [toggleDelete, setToggleDelete] = useState(false);

  useEffect(() => {
    //Onload, get branches
    getBranches()
  }, [])

  async function getBranches() {
    if (branches.length > 0) {
      return;
    }
    const response = await axios.get(PATH + "Branch/" + organizationID);
    // console.log(response.data);
    setBranches(response.data);
  }

  function prepareEditForm(branch) {
    setToggleEditForm(!toggleEditForm);
    setSelectedBranch(branch);
  }

  function prepareDeactive(branch) {
    setToggleDelete(!toggleDelete)
    setSelectedBranch(branch)
  }

  function handleFormSubmit(newArray) {
    setBranches(newArray);
    setToggleEditForm(false);
    setToggleCreate(false);
    setToggleDelete(false)
  }

  return (
    <main>
      <div className="sidebar">
        {toggleCreate ? ReactDOM.createPortal(
          <BranchCreateForm
            handleFormSubmit={handleFormSubmit}
            closeModal={() => { setToggleCreate(false) }}>
          </BranchCreateForm>,
          portalElement) : null}

        <button onClick={() => { setToggleCreate(true) }}>Create New Branch</button>
        <h2>Add a comment</h2>
        <Comment></Comment>
      </div>
      <div className="branch">
        
        {location.state == null ? <h1>Branches for Organization ID: {organizationID}</h1> : <h1>Branches for {location.state.organizationName}</h1>}
        {branches.length > 0 ?
          <table>
            <thead>
              <tr>
                <th>Branch Name</th>
                <th>Community</th>
                <th>Business Address</th>
                <th>Mailing Address</th>
                <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            {
              branches.map((branch) => {
                return (
                  <tbody key={branch.branchID}>
                    <tr onClick={() => {
                      navigate("/organization/" + organizationID + "/" + branch.branchID,
                        {
                          state: {
                            branch,
                            organizationName: location.state ? location.state.organizationName : "Unknown"
                          }
                        })
                    }}>
                      <td>{branch.branchName}</td>
                      <td>{branch.community}</td>
                      <td>{branch.businessAddress ? (`${branch.businessAddress}  ${branch.businessAddress2 ?? ""} ${branch.businessStreet ?? ""} ${branch.businessCity ?? ""} ${branch.businessProvince ?? ""} ${branch.businessPostalCode ?? ""}`) : ""}</td>
                      <td>{branch.mailingAddress ? (`${branch.mailingAddress}  ${branch.mailingAddress2 ?? ""} ${branch.mailingStreet ?? ""} ${branch.mailingCity ?? ""} ${branch.mailingProvince ?? ""} ${branch.mailingPostalCode ?? ""}`) : ""}</td>
                      <td>
                        {branch.active ? <div className="active">Active</div> : <div className="inactive">InActive</div>}
                      </td>
                      <td className="actions">
                        <button className="icon edit" onClick={(e) => {
                          e.stopPropagation();
                          prepareEditForm(branch)
                        }}><i class="fa-solid fa-pen"></i></button>


                        <button className="icon delete"
                          disabled={branch.active ? false : true}
                          onClick={(e) => {
                            e.stopPropagation();
                            prepareDeactive(branch)
                          }}><i class="fa-solid fa-ban"></i></button>

                      </td>
                    </tr>
                  </tbody>
                )
              })
            }
          </table>
          : <p>There are no branches under this organization</p>}



        {toggleEditForm ? ReactDOM.createPortal(
          <BranchUpdateForm
            selectedBranch={selectedBranch}
            handleFormSubmit={handleFormSubmit}
            closeModal={() => { setToggleEditForm(false) }}>
          </BranchUpdateForm>,
          portalElement) : null}

        {toggleDelete ? ReactDOM.createPortal(
          <BranchDelete
            selectedBranch={selectedBranch}
            handleFormSubmit={handleFormSubmit}
            closeModal={() => { setToggleDelete(false) }}>
          </BranchDelete>,
          portalElement) : null}

      </div>
    </main>
  );
}

export default Branch;
