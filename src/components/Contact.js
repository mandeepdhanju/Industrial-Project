import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ContactEditForm from "./ContactEditForm";

function Contact() {
  const PATH = "https://localhost:5001/api/"
  const {branchID} = useParams()

  const [contacts, setContacts] = useState([])
  const [selectedContact, setSelectedContact]= useState()

  //Show Edit Form State
  const [toggleEditForm, setToggleEditForm] = useState(false)

  useEffect(()=> {
    //Onload, get contacts
    getContacts()
  }, [])

  async function getContacts() {
    if (contacts.length > 0) {
      return
    }
    const response = await axios.get(PATH+"Contact/"+branchID)
    setContacts(response.data)
  }

  function prepareEditForm(contact) {
    setToggleEditForm(!toggleEditForm)
    setSelectedContact(contact)
  }

  function handleFormSubmit (newArray) {
    console.log(newArray)
    setContacts(newArray)
  }

  return (
  <div className="contact" style={{margin: '55px'}}>
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
                <td>{contact.primaryContact? "Primary": ""}</td>
                <td>{contact.active? "Active": "Inactive"}</td>
                <td>{contact.address.address1? (`${contact.address.address1}  ${contact.address.address2?? ""} ${contact.address.streetName} ${contact.address.city} ${contact.address.province} ${contact.address.postalCode}`) : ""}</td>
                <td><button onClick={() => {prepareEditForm(contact)}}>✏️</button></td>
              </tr>
            </tbody>
            )
          })
        }
    </table>
    {toggleEditForm? <ContactEditForm selectedContact={selectedContact} handleFormSubmit={handleFormSubmit}></ContactEditForm>: ""}
    </div>
  );}

export default Contact;
