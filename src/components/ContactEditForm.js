import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function ContactEditForm({ selectedContact, handleFormSubmit }) {

    const { branchID } = useParams()
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
            addressCheckedWithDB: false
        }
    })

    const PATH = "https://localhost:5001/api/"

    //Put selected object in state
    useEffect(() => {
        function loadContact() {
            setContact(selectedContact)
            // console.log(selectedContact)
        }
        loadContact()
    }, [])

    const submitForm = async (form) => {
        form.preventDefault()
        //Check if user made any changes to the Address section. If so, do put request to address endpoint
        if (contact.addressChanged == true) {
            const response = await axios.put(PATH + "Address", {
                address1: contact.address.address1,
                address2: contact.address.address2,
                streetName: contact.address.streetName,
                city: contact.address.city,
                province: contact.address.province,
                postalCode: contact.address.postalCode
            })
            console.log(response.data)
            setContact({
                ...contact,
                address: response.data,
                addressCheckedWithDB: true
            })
            return
        }
        setContact({ ...contact, addressCheckedWithDB: true })
    }

    //Run this after Address object has been updated
    useEffect(() => {
        async function editContact() {
            if (contact.addressCheckedWithDB != true) {
                return
            }
            console.log(contact)
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
                address: contact.address
            })
            handleFormSubmit(response2.data)
            setContact({ ...contact, addressCheckedWithDB: false })
        }
        editContact()
    }, [contact])

    return (
        <div>
            <form onSubmit={(e) => { submitForm(e) }}>
                <label htmlFor='name'>Name</label>
                <input
                    name="name"
                    placeholder={contact.name}
                    onChange={(e) => setContact({ ...contact, name: e.target.value })}></input>

                <label htmlFor='email'>Email</label>
                <input
                    name="email"
                    placeholder={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}></input>

                <label htmlFor='phoneNumber'>Phone Number</label>
                <input
                    name="phoneNumber"
                    placeholder={contact.phoneNumber}
                    onChange={(e) => setContact({ ...contact, phoneNumber: e.target.value })}></input>

                <label htmlFor='fax'>Fax</label>
                <input
                    name="fax"
                    placeholder={contact.fax}
                    onChange={(e) => setContact({ ...contact, fax: e.target.value })}></input>

                <label htmlFor='jobTitle'>Job Title</label>
                <input
                    name="jobTitle"
                    placeholder={contact.jobTitle}
                    onChange={(e) => setContact({ ...contact, jobTitle: e.target.value })}></input>

                <label htmlFor='primaryContact'>Primary Contact?</label>
                <input
                    type='checkbox'
                    name="primaryContact"
                    defaultChecked={contact.primaryContact}
                ></input>

                <label htmlFor='active'>Active?</label>
                <input
                    type='checkbox'
                    name="active"
                    defaultChecked={contact.active}
                ></input>

                <div className="addressForm">
                    <h1>Contact Address</h1>

                    <label htmlFor='address1'>Address 1</label>
                    <input
                        name="address1"
                        placeholder={contact.address.address1}
                        onChange={(e) => setContact({ ...contact, address: { ...contact.address, address1: e.target.value }, addressChanged: true })}></input>

                    <label htmlFor='address2'>Address 2</label>
                    <input
                        name="address2"
                        placeholder={contact.address.address2}
                        onChange={(e) => setContact({ ...contact, address: { ...contact.address, address2: e.target.value }, addressChanged: true })}></input>

                    <label htmlFor='streetName'>Street</label>
                    <input
                        name="streetName"
                        placeholder={contact.address.streetName}
                        onChange={(e) => setContact({ ...contact, address: { ...contact.address, streetName: e.target.value }, addressChanged: true })}></input>

                    <label htmlFor='city'>City</label>
                    <input
                        name="city"
                        placeholder={contact.address.city}
                        onChange={(e) => setContact({ ...contact, address: { ...contact.address, city: e.target.value }, addressChanged: true })}></input>

                    <label htmlFor='province'>Province</label>
                    <input
                        name="province"
                        placeholder={contact.address.province}
                        onChange={(e) => setContact({ ...contact, address: { ...contact.address, province: e.target.value }, addressChanged: true })}></input>

                    <label htmlFor='postalCode'>Postal Code</label>
                    <input
                        name="postalCode"
                        placeholder={contact.address.postalCode}
                        onChange={(e) => setContact({ ...contact, address: { ...contact.address, postalCode: e.target.value }, addressChanged: true })}></input>

                </div>
                <button type='submit'>Save Changes</button>
            </form>
        </div>
    )
}

export default ContactEditForm