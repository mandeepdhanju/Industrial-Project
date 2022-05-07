import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BranchCreateForm({ pushToArray }) {
  const { organizationID } = useParams()
  const [communities, setCommunities] = useState([]);
  const [branch, setBranch] = useState();
  const [newBranch, setNewBranch] = useState();

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

    // console.log(form.target.elements.numberOfEmployees.selectedOptions[0].innerText)
    let formData = form.target.elements;
    console.log("heloo", formData.communityID.value)

    const obj = {
      branchName: formData.branchName.value,
      address1: `${formData.businessAddress1.value} ${formData.businessAddress2.value}`,
      stretname: formData.businessStreet,
      city: formData.businessCity.value,
      province: formData.businessProvince.value,
      postalCode: formData.businessPostal.value,
      communityID: parseInt(formData.communityID.value),
      comment: formData.comment.value,
      //businessAddress: formData.businessAddress.value,
      //mailingAddress: formData.mailingAddress.value,
      //mailingAddressId: parseInt(formData.address1.value, formData.address2.value, formData.streetName.value, formData.city.value, formData.province.value,),
      //organizationID: parseInt(formData.organizationID.value),
      //oranizationName: form.elements.oranization.selectedOptions[0].innerText,
      // communityName: form.target.elements.community.selectedOptions[0].innerText,
    };

    // console.log(response.data)
    setBranch(obj);
  };

  useEffect(() => {
    if (!branch) {
      return;
    }

    //https://localhost:5001/api/Branch
    async function createBranch() {
      console.log(organizationID)
      const response = await axios.post(PATH + "Branch", {
        organizationID: organizationID,
        branchName: branch.branchName,
        communityID: branch.communityID,
        businessAddress: {
          address1: branch.address1,
          city: branch.city,
          province: branch.province,
          postalCode: branch.postalCode,
        },
        mailingAddress: {
          address1: branch.address1,
          city: branch.city,
          province: branch.province,
          postalCode: branch.postalCode,
        },
        comment: branch.comment,
      });
      console.log(response.data);
      //   setBranch(response.data.value)

      setNewBranch({
        ...branch,
        branchID: response.data,
        activeCommunity: 0,
        active: true,
      });
    }

    createBranch();
  }, [branch]);

  useEffect(() => {
    function updateTable() {
      if (!newBranch) {
        return;
      }
      console.log(newBranch);
      pushToArray(newBranch);
    }
    updateTable();
  }, [newBranch]);

  return (
    <div className="form-container">
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

        <h2>Business Address</h2>

        <label>
          Street Address 1
          <input
            type="text"
            name="businessAddress1"
            placeholder="Please enter the Business Street Address"
          />
        </label>

        <label>
          Street Address 2
          <input
            type="text"
            name="businessAddress2"
            placeholder="Please enter the Business Street Address"
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

        {/* <label>Mailing Address
                    <input type="text" name="mailingAddressId" placeholder="Please enter the Mailing Address"/>
                </label> */}

        <label>
          Comment [optional]
          <textarea name="comment" placeholder="Add a comment" />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default BranchCreateForm;
