import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

function ContactCreateForm({ handleFormSubmit, closeModal }) {
  const [contact, setContact] = useState();
  const [errorMsg, setErrorMsg] = useState();

  const PATH = process.env.REACT_APP_API_URL;
  const { branchID } = useParams();

  const submitForm = async (form) => {
    form.preventDefault();
    const response = await axios.post(PATH + "Contact/" + branchID, {
      contactId: contact.contactId,
      name: contact.name,
      email: contact.email,
      phoneNumber: contact.phoneNumber,
      fax: contact.fax,
      jobTitle: contact.jobTitle,
      primaryContact: contact.primaryContact,
      active: contact.active,
      //Backend keeps getting null
      address: contact.address,
    });
    if (response.data.error) {
      setErrorMsg(response.data.error)
      return
    }
    handleFormSubmit(response.data);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: 5000,
        backgroundColor: "rgba(0, 0, 0, 0.75)",
      }}
      onClick={closeModal}
    >
      <form
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          backgroundColor: "white",
          padding: "1rem",
          zIndex: 5001,
        }}
        onSubmit={(e) => {
          submitForm(e);
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {errorMsg ? <div className="errorBox"><p>{errorMsg}</p></div> : null}
        <label htmlFor="name">Name</label>
        <input
          name="name"
          onChange={(e) => setContact({ ...contact, name: e.target.value })}
          required={true}
        ></input>

        <label htmlFor="email">Email</label>
        <input
          name="email"
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
          required={true}
        ></input>

        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          name="phoneNumber"
          onChange={(e) =>
            setContact({ ...contact, phoneNumber: e.target.value })
          }
          required={true}
        ></input>

        <label htmlFor="fax">Fax</label>
        <input
          name="fax"
          onChange={(e) => setContact({ ...contact, fax: e.target.value })}
        ></input>

        <label htmlFor="jobTitle">Job Title</label>
        <input
          name="jobTitle"
          onChange={(e) => setContact({ ...contact, jobTitle: e.target.value })}
        ></input>

        <label htmlFor="primaryContact">Primary Contact?</label>
        <input
          type="checkbox"
          name="primaryContact"
          onChange={(e) =>
            setContact({ ...contact, primaryContact: e.target.checked })
          }
        ></input>

        <div className="addressForm">
          <h1>Contact Address</h1>

          <label htmlFor="address1">Address 1</label>
          <input
            name="address1"
            onChange={(e) =>
              setContact({
                ...contact,
                address: { ...contact.address, address1: e.target.value },
                addressChanged: true,
              })
            }
          ></input>

          <label htmlFor="address2">Address 2</label>
          <input
            name="address2"
            onChange={(e) =>
              setContact({
                ...contact,
                address: { ...contact.address, address2: e.target.value },
                addressChanged: true,
              })
            }
          ></input>

          <label htmlFor="streetName">Street</label>
          <input
            name="streetName"
            onChange={(e) =>
              setContact({
                ...contact,
                address: { ...contact.address, streetName: e.target.value },
                addressChanged: true,
              })
            }
          ></input>

          <label htmlFor="city">City</label>
          <input
            name="city"
            onChange={(e) =>
              setContact({
                ...contact,
                address: { ...contact.address, city: e.target.value },
                addressChanged: true,
              })
            }
          ></input>

          <label htmlFor="province">Province</label>
          <input
            name="province"
            onChange={(e) =>
              setContact({
                ...contact,
                address: { ...contact.address, province: e.target.value },
                addressChanged: true,
              })
            }
          ></input>

          <label htmlFor="postalCode">Postal Code</label>
          <input
            name="postalCode"
            onChange={(e) =>
              setContact({
                ...contact,
                address: { ...contact.address, postalCode: e.target.value },
                addressChanged: true,
              })
            }
          ></input>
        </div>
        <button type="submit">Create New Contact</button>
      </form>
    </div>
  );
}

export default ContactCreateForm;
