import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ContactEditForm({ selectedContact, handleFormSubmit, closeModal }) {
  const { branchID } = useParams();
  const [contact, setContact] = useState({
    address: {
      address1: null,
      address2: null,
      addressID: null,
      city: null,
      created: null,
      lastModified: null,
      postalCode: null,
      province: null,
      streetName: null,
      addressCheckedWithDB: false,
    },
  });

  const PATH = process.env.REACT_APP_API_URL;

  //Put selected object in state
  useEffect(() => {
    function loadContact() {
      setContact(selectedContact);
      // console.log(selectedContact)
    }
    loadContact();
  }, []);

  const submitForm = async (form) => {
    form.preventDefault();
    //Check if user made any changes to the Address section. If so, do put request to address endpoint
    if (contact.addressChanged == true) {
      const response = await axios.put(PATH + "Address", {
        address1: contact.address.address1,
        address2: contact.address.address2,
        streetName: contact.address.streetName,
        city: contact.address.city,
        province: contact.address.province,
        postalCode: contact.address.postalCode,
      });
      console.log(response.data);
      setContact({
        ...contact,
        address: response.data,
        addressCheckedWithDB: true,
      });
      return;
    }
    setContact({ ...contact, addressCheckedWithDB: true });
  };

  //Run this after Address object has been updated
  useEffect(() => {
    async function editContact() {
      if (contact.addressCheckedWithDB != true) {
        return;
      }
      console.log(contact);
      const response2 = await axios.put(PATH + "Contact/" + branchID, {
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
      handleFormSubmit(response2.data);
      setContact({ ...contact, addressCheckedWithDB: false });
    }
    editContact();
  }, [contact]);

  return (
    <div className="split-col"
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
        <div className="col-1">
        <div className="required">
          <label htmlFor="name">Name</label>
        </div>

        <input
          name="name"
          placeholder={contact.name}
          onChange={(e) => setContact({ ...contact, name: e.target.value })}
        ></input>

        <div className="required">
          <label htmlFor="email">Email</label>
        </div>

        <input
          name="email"
          placeholder={contact.email}
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
        ></input>

        <div className="required">
          <label htmlFor="phoneNumber">Phone Number</label>
        </div>

        <input
          name="phoneNumber"
          placeholder={contact.phoneNumber}
          onChange={(e) =>
            setContact({ ...contact, phoneNumber: e.target.value })
          }
        ></input>

        <label htmlFor="fax">Fax</label>
        <input
          name="fax"
          placeholder={contact.fax}
          onChange={(e) => setContact({ ...contact, fax: e.target.value })}
        ></input>

        <label htmlFor="jobTitle">Job Title</label>
        <input
          name="jobTitle"
          placeholder={contact.jobTitle}
          onChange={(e) => setContact({ ...contact, jobTitle: e.target.value })}
        ></input>

        <label style={{"display": "inline",}}>Primary Contact?
        <input
          type="checkbox"
          name="primaryContact"
          defaultChecked={contact.primaryContact}
          onChange={(e) =>
            setContact({ ...contact, primaryContact: e.target.checked })
          }
        />
      </label>
        <label style={{"display": "inline",}}>Active?
        <input
          type="checkbox"
          name="active"
          defaultChecked={contact.active}
          onChange={(e) => setContact({ ...contact, active: e.target.checked })}
       />
        </label>
        </div>
        <div className="col-2">
        <div className="addressForm">
          <h1>Contact Address</h1>

          <label htmlFor="address1">Address 1</label>
          <input
            name="address1"
            placeholder={contact.address.address1}
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
            placeholder={contact.address.address2}
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
            placeholder={contact.address.streetName}
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
            placeholder={contact.address.city}
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
            placeholder={contact.address.province}
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
            placeholder={contact.address.postalCode}
            onChange={(e) =>
              setContact({
                ...contact,
                address: { ...contact.address, postalCode: e.target.value },
                addressChanged: true,
              })
            }
          ></input>
        </div>
        <button type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  );
}

export default ContactEditForm;
