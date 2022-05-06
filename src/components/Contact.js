import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ContactEditForm from "./ContactEditForm";
import ReactDOM from 'react-dom';
import ContactDelete from "./ContactDelete";
import ContactCreateForm from "./ContactCreateForm";

function Contact() {

  const portalElement = document.getElementById('modal')

  const PATH = "https://localhost:5001/api/"
  const { branchID } = useParams()

  const [contacts, setContacts] = useState([])
  const [selectedContact, setSelectedContact] = useState()

  //Show Edit Form State
  const [toggleEditForm, setToggleEditForm] = useState(false)
  //Show Create Popup
  const [toggleCreate, setToggleCreate] = useState(false)
  //Show Delete Popup
  const [toggleDelete, setToggleDelete] = useState(false)

  useEffect(() => {
    //Onload, get contacts
    getContacts()
  }, [])

  async function getContacts() {
    if (contacts.length > 0) {
      return
    }
    const response = await axios.get(PATH + "Contact/" + branchID)
    if (response.data.message) {
      setContacts([])
      return
    }
    setContacts(response.data)
  }

  async function deactiveContact(contact) {
    const response = await axios.delete(`${PATH}Contact/${branchID}/${contact.contactId}`)
    setContacts(response.data)
    setToggleDelete(false)
  }

  function prepareEditForm(contact) {
    setToggleEditForm(!toggleEditForm)
    setSelectedContact(contact)
  }

  function prepareDeactive(contact) {
    setToggleDelete(!toggleDelete)
    setSelectedContact(contact)
  }

  function handleFormSubmit(newArray) {
    setContacts(newArray)
    setToggleEditForm(false)
    setToggleCreate(false)
  }

  return (
    <div className="contact" style={{ margin: '55px' }}>

      {toggleCreate ? ReactDOM.createPortal(
        <ContactCreateForm
          handleFormSubmit={handleFormSubmit}
          closeModal={() => { setToggleCreate(false) }}>
        </ContactCreateForm>,
        portalElement) : null}
      <button onClick={() => { setToggleCreate(!toggleCreate) }}>Create New Contact</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Fax</th>
            <th>Job Title</th>
            <th>Primary Contact</th>
            <th>Active</th>
            <th>Address</th>
            <th>Edit</th>
          </tr>
        </thead>
        {
          contacts.map((contact) => {
            return (
              <tbody key={contact.contactId}>
                <tr>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phoneNumber}</td>
                  <td>{contact.fax}</td>
                  <td>{contact.jobTitle}</td>
                  <td>{contact.primaryContact ? "Primary" : null}</td>
                  <td>{contact.active ? "Active" : "Inactive"}</td>
                  <td>{contact.address.address1 ? (`${contact.address.address1}  ${contact.address.address2 ?? null} ${contact.address.streetName} ${contact.address.city} ${contact.address.province} ${contact.address.postalCode}`) : null}</td>
                  <td>
                    <button onClick={() => { prepareEditForm(contact) }}>✏️</button>
                    {contact.active ? <button onClick={() => { prepareDeactive(contact) }}>🗑️</button> : null}
                  </td>
                </tr>
              </tbody>
            )
          })
        }
      </table>
      {toggleEditForm ? ReactDOM.createPortal(
        <ContactEditForm
          selectedContact={selectedContact}
          handleFormSubmit={handleFormSubmit}
          closeModal={() => { setToggleEditForm(false) }}>
        </ContactEditForm>,
        portalElement) : null}

      {toggleDelete ? ReactDOM.createPortal(
        <ContactDelete
          selectedContact={selectedContact}
          deactiveContact={deactiveContact}
          closeModal={() => { setToggleDelete(false) }}>
        </ContactDelete>,
        portalElement) : null}
    </div>
  );
}

export default Contact;
