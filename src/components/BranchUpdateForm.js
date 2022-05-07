import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BranchUpdateForm({ selectedBranch, handleFormSubmit, closeModal }) {
    const { organizationID } = useParams();

    const [branch, setBranch] = useState({})
    const [businessAddress, setBusinessAddress] = useState({
        address1: null,
        address2: null,
        streetName: null,
        city: null,
        province: null,
        postalCode: null

    })

    const [mailingAddress, setmailingAddress] = useState({
        address1: null,
        address2: null,
        streetName: null,
        city: null,
        province: null,
        postalCode: null

    })

    const [communities, setCommunitites] = useState([])
    const PATH = process.env.REACT_APP_API_URL;

    //Onload / mount, put the selected object Address in state and grab communities
    useEffect(() => {
        function loadBranch() {
            setBranch(selectedBranch)
            if (selectedBranch.businessAddressId) {
                setBusinessAddress({
                    address1: selectedBranch.businessAddress,
                    address2: selectedBranch.businessAddress2,
                    streetName: selectedBranch.businessStreetName,
                    city: selectedBranch.businessCity,
                    province: selectedBranch.businessProvince,
                    postalCode: selectedBranch.businessPostalCode,
                    addressID: selectedBranch.businessAddressId
                })

            }
            if (selectedBranch.mailingAddressId) {
                setmailingAddress({
                    exists: true,
                    address1: selectedBranch.mailingAddress,
                    address2: selectedBranch.mailingAddress2,
                    streetName: selectedBranch.mailingStreetName,
                    city: selectedBranch.mailingCity,
                    province: selectedBranch.mailingProvince,
                    postalCode: selectedBranch.mailingPostalCode,
                    addressID: selectedBranch.mailingAddressId
                })
            }
        }

        async function loadCommunities() {
            const response = await axios.get(PATH + "Community")
            setCommunitites(response.data)
        }
        loadBranch()
        loadCommunities()
    }, [])

    const submitForm = async (form) => {
        form.preventDefault()
        //Check if user made any changes to the Address section. If so, do put request to address endpoint
        if (businessAddress.addressChanged == true) {
            const response = await axios.put(PATH + "Address", {
                address1: businessAddress.address1,
                address2: businessAddress.address2,
                streetName: businessAddress.streetName,
                city: businessAddress.city,
                province: businessAddress.province,
                postalCode: businessAddress.postalCode,
            })
            console.log(response.data)
            setBranch({
                ...branch,
                businessAddressId: response.data.addressID,
                addressCheckedWithDB: true,
            })
            return
        }
        setBranch({
            ...branch,
            addressCheckedWithDB: true,
        })

        if (mailingAddress.addressChanged == true) {
            const response = await axios.put(PATH + "Address", {
                address1: mailingAddress.address1,
                address2: mailingAddress.address2,
                streetName: mailingAddress.streetName,
                city: mailingAddress.city,
                province: mailingAddress.province,
                postalCode: mailingAddress.postalCode,
            })
            console.log(response.data)
            setBranch({
                ...branch,
                mailingAddressI: response.data.addressID,
                addressCheckedWithDB: true,
            })
            return
        }
        setBranch({
            ...branch,
            addressCheckedWithDB: true,
        })
    }

    //Run this after Address object has been checked
    useEffect(() => {
        async function editBranch() {
            if (branch.addressCheckedWithDB != true) {
                return
            }
            console.log(branch)
            const response2 = await axios.put(PATH + "Branch/" + branch.branchID, {
                organizationID: organizationID,
                branchName: branch.branchName,
                communityID: branch.communityID,
                businessAddressID: branch.businessAddressId,
                mailingAddressId: mailingAddress.exists ? branch.mailingAddressId : null,
                active: branch.active
            })
            handleFormSubmit(response2.data.value)
            setBranch({ ...branch, addressCheckedWithDB: false })
        }
        editBranch()
    }, [branch])

    return (
        <div style={{
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
                onSubmit={(e) => { submitForm(e) }}
                onClick={(e) => e.stopPropagation()}>
                <label htmlFor='branchName'>Branch Name</label>
                <input
                    name="branchName"
                    required
                    placeholder={branch.branchName}
                    onChange={(e) => setBranch({ ...branch, branchName: e.target.value })}></input>

                <label htmlFor='communityID'>Community</label>
                <select
                    name="communityID"
                    onChange={(e) => setBranch({ ...branch, communityID: e.target.value })}>
                    <option disabled>Please select a community</option>

                    {communities.map((community) => {
                        if (community.communityName == branch.community) {
                            return <option selected key={community.communityID} value={community.communityID}>{community.communityName}</option>
                        }
                        return <option key={community.communityID} value={community.communityID}>{community.communityName}</option>
                    })}
                </select>

                <label htmlFor='active'>Active?</label>
                <input
                    type='checkbox'
                    name="active"
                    defaultChecked={branch.active}
                    onClick={(e) => setBranch({ ...branch, active: e.target.checked })}
                ></input>

                <label htmlFor='active'>Mailing Address?</label>
                <input
                    type='checkbox'
                    defaultChecked={branch.mailingAddress}
                    onClick={(e) => setmailingAddress({ exists: e.target.checked })}
                ></input>

                <div className="businessAddressForm">
                    <h1>Business Address</h1>

                    <label htmlFor='address1'>Address 1</label>
                    <input
                        name="address1"
                        placeholder={branch.businessAddress}
                        onChange={(e) => setBusinessAddress({ ...businessAddress, address1: e.target.value, addressChanged: true })}></input>

                    <label htmlFor='address2'>Address 2</label>
                    <input
                        name="address2"
                        placeholder={branch.businessAddress2}
                        onChange={(e) => setBusinessAddress({ ...businessAddress, address2: e.target.value, addressChanged: true })}></input>

                    <label htmlFor='streetName'>Street</label>
                    <input
                        name="streetName"
                        placeholder={branch.businessStreet}
                        onChange={(e) => setBusinessAddress({ ...businessAddress, streetName: e.target.value, addressChanged: true })}></input>

                    <label htmlFor='city'>City</label>
                    <input
                        name="city"
                        placeholder={branch.businessCity}
                        onChange={(e) => setBusinessAddress({ ...businessAddress, city: e.target.value, addressChanged: true })}></input>

                    <label htmlFor='province'>Province</label>
                    <input
                        name="province"
                        placeholder={branch.businessProvince}
                        onChange={(e) => setBusinessAddress({ ...businessAddress, province: e.target.value, addressChanged: true })}></input>

                    <label htmlFor='postalCode'>Postal Code</label>
                    <input
                        name="postalCode"
                        placeholder={branch.businessPostalCode}
                        pattern="[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]"
                        onChange={(e) => setBusinessAddress({ ...businessAddress, postalCode: e.target.value, addressChanged: true })}></input>

                </div>

                {mailingAddress.exists ?
                    <div className="mailingAddressForm">
                        <h1>Mailing Address</h1>

                        <label htmlFor='address1'>Address 1</label>
                        <input
                            name="address1"
                            placeholder={branch.mailingAddress}
                            onChange={(e) => setmailingAddress({ ...mailingAddress, address1: e.target.value, addressChanged: true })}></input>

                        <label htmlFor='address2'>Address 2</label>
                        <input
                            name="address2"
                            placeholder={branch.mailingAddress2}
                            onChange={(e) => setmailingAddress({ ...mailingAddress, address2: e.target.value, addressChanged: true })}></input>

                        <label htmlFor='streetName'>Street</label>
                        <input
                            name="streetName"
                            placeholder={branch.mailingStreet}
                            onChange={(e) => setmailingAddress({ ...mailingAddress, streetName: e.target.value, addressChanged: true })}></input>

                        <label htmlFor='city'>City</label>
                        <input
                            name="city"
                            placeholder={branch.mailingCity}
                            onChange={(e) => setmailingAddress({ ...mailingAddress, city: e.target.value, addressChanged: true })}></input>

                        <label htmlFor='province'>Province</label>
                        <input
                            name="province"
                            placeholder={branch.mailingProvince}
                            onChange={(e) => setmailingAddress({ ...mailingAddress, province: e.target.value, addressChanged: true })}></input>

                        <label htmlFor='postalCode'>Postal Code</label>
                        <input
                            name="postalCode"
                            placeholder={branch.mailingPostalCode}
                            pattern="[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]"
                            onChange={(e) => setmailingAddress({ ...mailingAddress, postalCode: e.target.value, addressChanged: true })}></input>
                    </div>
                    : null}
                <button type='submit'>Save Changes</button>
            </form>
        </div >
    )
}

export default BranchUpdateForm