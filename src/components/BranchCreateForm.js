import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BranchCreateForm({ handleFormSubmit, closeModal }) {
  const { organizationID } = useParams()

  const [communities, setCommunities] = useState([]);
  const [branch, setBranch] = useState({ mailingExists: false });
  const [newBranch, setNewBranch] = useState()
  const [errorMsg, setErrorMsg] = useState()

  const PATH = process.env.REACT_APP_API_URL;

  useEffect(() => {
    async function getCommunity() {
      const response = await axios.get(PATH + "Community");
      setCommunities(response.data);
    }
    getCommunity();
  }, []);

  const loadFormData = (form) => {
    form.preventDefault();

    let formData = form.target.elements;

    const obj = {
      organizationID: organizationID,
      branchName: formData.branchName.value,
      communityID: parseInt(formData.communityID.value),

      businessAddress: {
        address1: formData.businessAddress1.value,
        address2: formData.businessAddress2.value,
        stretname: formData.businessStreet.value,
        city: formData.businessCity.value,
        province: formData.businessProvince.value,
        postalCode: formData.businessPostal.value,
      },

      mailingAddress:
        branch.mailingExists ?
          {
            address1: formData.mailingAddress1.value,
            address2: formData.mailingAddress2.value,
            stretname: formData.mailingStreet.value,
            city: formData.mailingCity.value,
            province: formData.mailingProvince.value,
            postalCode: formData.mailingPostal.value,
          }
          : null
    };
    setNewBranch(obj);
  }

  useEffect(() => {
    if (!newBranch) {
      return;
    }

    async function createBranch() {

      console.log(newBranch)
      const response = await axios.post(PATH + "Branch", {
        organizationID: newBranch.organizationID,
        branchName: newBranch.branchName,
        communityID: newBranch.communityID,
        businessAddress: newBranch.businessAddress,
        mailingAddress: newBranch.mailingAddress
      });

      //If error, display error
      if (response.data.error) {
        setErrorMsg(response.data.error)
        return
      }

      //No error, go get request and send back to Parent component
      const branchArray = await axios.get(PATH + "Branch/"+organizationID)
      handleFormSubmit(branchArray.data)
    }
    createBranch();
  }, [newBranch]);


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
      onClick={closeModal}>

      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        backgroundColor: "white",
        padding: "1rem",
        zIndex: 5001,
      }}
        onClick={(e) => { e.stopPropagation() }}
      >
        <form onSubmit={loadFormData}>
          <label>
            Branch Name
            <input
              type="text"
              name="branchName"
              placeholder="Please enter the Branch Name"
            />
          </label>
          <label>
            Community
            <select name="communityID">
              {communities.map((c, index) => {
                return (
                  <option key={index} value={c.communityID}>
                    {c.communityName}
                  </option>
                );
              })}
            </select>
          </label>

          <label htmlFor='active'>Mailing Address?</label>
          <input
            type='checkbox'
            onClick={(e) => setBranch({ ...branch, mailingExists: e.target.checked })}
          ></input>

          <div className="businessAddressForm">
            <h2>Business Address</h2>

            <label>
              Address 1
              <input
                type="text"
                name="businessAddress1"
                placeholder="Please enter the Business Address"
              />
            </label>

            <label>
              Address 2
              <input
                type="text"
                name="businessAddress2"
                placeholder="Please enter the Business Address Line 2"
              />
            </label>
            <label>
              Street Name
              <input
                type="text"
                name="businessStreet"
                placeholder="Please enter the Business Street Name"
              />
            </label>

            <label>
              City
              <input
                type="text"
                name="businessCity"
                placeholder="Please enter the Business City Address"
              />
            </label>

            <label>
              Province
              <select name="businessProvince">
                <option value="AB">Alberta</option>
                <option value="BC">British Columbia</option>
                <option value="MB">Manitoba</option>
                <option value="NB">New Brunswick</option>
                <option value="NL">Newfoundland and Labrador</option>
                <option value="NS">Nova Scotia</option>
                <option value="NT">Northwest Territories</option>
                <option value="NU">Nunavut</option>
                <option value="ON">Ontario</option>
                <option value="PE">Prince Edward Island</option>
                <option value="QC">Quebec</option>
                <option value="SK">Saskatchewan</option>
                <option value="YT">Yukon</option>
              </select>
            </label>

            <label>
              Postal Code
              <input
                type="text"
                name="businessPostal"
                placeholder="V3X 0B9"
                pattern="[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]"
              />
            </label>

          </div>

          {branch.mailingExists ?
            <div className="mailingAddressForm">
              <h2>Mailing Address</h2>

              <label>
                Address 1
                <input
                  type="text"
                  name="mailingAddress1"
                  placeholder="Please enter the Mailing Address"
                />
              </label>

              <label>
                Address 2
                <input
                  type="text"
                  name="mailingAddress2"
                  placeholder="Please enter the Mailing Address Line 2"
                />
              </label>
              <label>
                Street Name
                <input
                  type="text"
                  name="mailingStreet"
                  placeholder="Please enter the Mailing Street Name"
                />
              </label>

              <label>
                City
                <input
                  type="text"
                  name="mailingCity"
                  placeholder="Please enter the Mailing City Address"
                />
              </label>

              <label>
                Province
                <select name="mailingProvince">
                  <option value="AB">Alberta</option>
                  <option value="BC">British Columbia</option>
                  <option value="MB">Manitoba</option>
                  <option value="NB">New Brunswick</option>
                  <option value="NL">Newfoundland and Labrador</option>
                  <option value="NS">Nova Scotia</option>
                  <option value="NT">Northwest Territories</option>
                  <option value="NU">Nunavut</option>
                  <option value="ON">Ontario</option>
                  <option value="PE">Prince Edward Island</option>
                  <option value="QC">Quebec</option>
                  <option value="SK">Saskatchewan</option>
                  <option value="YT">Yukon</option>
                </select>
              </label>

              <label>
                Postal Code
                <input
                  type="text"
                  name="mailingPostal"
                  placeholder="V6B 3H6"
                  pattern="[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]"
                />
              </label>
            </div>
            : null}

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default BranchCreateForm;
