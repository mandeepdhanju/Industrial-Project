
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ReactDOM from 'react-dom';
import BranchUpdateForm from "./BranchUpdateForm";


function Branch() {

  const portalElement = document.getElementById('modal')

  const PATH = "https://localhost:5001/api/"
  const navigate = useNavigate();
  const location = useLocation();
  const { organizationID } = useParams()

  const [branches, setBranches] = useState([])
  const [selectedBranch, setSelectedBranch] = useState()

  //Show Edit Form State
  const [toggleEditForm, setToggleEditForm] = useState(false)
  //Show Create Popup
  const [toggleCreate, setToggleCreate] = useState(false)
  //Show Delete Popup
  const [toggleDelete, setToggleDelete] = useState(false)

  useEffect(() => {
    //Onload, get contacts
    getBranches()
  }, [])

  async function getBranches() {
    if (branches.length > 0) {
      return
    }
    const response = await axios.get(PATH + "Branch/" + organizationID)
    console.log(response.data)
    setBranches(response.data)
  }

  // async function deactiveContact(contact) {
  //   const response = await axios.delete(`${PATH}Contact/${branchID}/${contact.contactId}`)
  //   setContacts(response.data)
  //   setToggleDelete(false)
  // }

  function prepareEditForm(branch) {
    setToggleEditForm(!toggleEditForm)
    setSelectedBranch(branch)
  }

  // function prepareDeactive(contact) {
  //   setToggleDelete(!toggleDelete)
  //   setSelectedContact(contact)
  // }

  function handleFormSubmit(newArray) {
    console.log(newArray)
    setBranches(newArray)
    setToggleEditForm(false)
    setToggleCreate(false)
  }

  return (
    <main>
      <div className="sidebar">
        {/* {toggleCreate ? ReactDOM.createPortal(
        <ContactCreateForm
          handleFormSubmit={handleFormSubmit}
          closeModal={() => { setToggleCreate(false) }}>
        </ContactCreateForm>,
        portalElement) : null}
      <button onClick={() => { setToggleCreate(!toggleCreate) }}>Create New Branch</button> */}
      </div>
      <div className="branch" style={{ margin: '55px' }}>

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
                    <tr onClick={() => { navigate("/organization/" + organizationID + "/" + branch.branchID) }}>
                      <td>{branch.branchName}</td>
                      <td>{branch.community}</td>
                      <td>{branch.businessAddress ? (`${branch.businessAddress}  ${branch.businessAddress2 ?? ""} ${branch.businessStreet ?? ""} ${branch.businessCity ?? ""} ${branch.businessProvince ?? ""} ${branch.businessPostalCode ?? ""}`) : ""}</td>
                      <td>{branch.mailingAddress ? (`${branch.mailingAddress}  ${branch.mailingAddress2 ?? ""} ${branch.mailingStreet ?? ""} ${branch.mailingCity ?? ""} ${branch.mailingProvince ?? ""} ${branch.mailingPostalCode ?? ""}`) : ""}</td>
                      <td>{branch.active ? "Active" : "Inactive"}</td>
                      <td>
                        <button onClick={(e) => {
                          e.stopPropagation();
                          prepareEditForm(branch)
                        }}>Edit</button>

                        {branch.active ? <button>Deactivate</button> : null}
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

        {/* {toggleDelete ? ReactDOM.createPortal(
        <ContactDelete
          selectedContact={selectedContact}
          deactiveContact={deactiveContact}
          closeModal={() => { setToggleDelete(false) }}>
        </ContactDelete>,
        portalElement) : null} */}

      </div>
    </main>
  );
}


export default Branch;

