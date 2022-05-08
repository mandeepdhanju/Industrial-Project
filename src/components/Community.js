import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommunityUpdateForm from "./CommunityUpdateForm";
import CommunityDelete from "./CommunityDelete";
import CommunityAddForm from "./CommunityAddForm";
import ReactDOM from 'react-dom';

function Community() {
  const axios = require("axios");
  const PATH = process.env.REACT_APP_API_URL;
  const portalElement = document.getElementById("modal");

  const [communities, setCommunities] = useState([])
  const [selectedCommunity, setSelectedCommunity] = useState({})

  //Show Edit Form State
  const [toggleEditForm, setToggleEditForm] = useState(false);
  //Show Create Popup
  const [toggleCreate, setToggleCreate] = useState(false);
  //Show Delete Popup
  const [toggleDelete, setToggleDelete] = useState(false);

  useEffect(() => {
    async function loadCommunities() {
      const response = await axios.get(PATH + "Community")
      console.log(response.data)
      setCommunities(response.data)
    }
    loadCommunities()
  }, [])

  function handleFormSubmit(newArray) {
    setCommunities(newArray)
    setToggleEditForm(false)
    setToggleCreate(false)
    setToggleDelete(false)
  }

  return (
    <main>
      {toggleCreate ? ReactDOM.createPortal(
        <CommunityAddForm
          handleFormSubmit={handleFormSubmit}
          closeModal={() => { setToggleCreate(false) }}>
        </CommunityAddForm>,
        portalElement) : null}

      <button onClick={() => setToggleCreate(true)}>Add New Community</button>
      <table>
        <thead>
          <tr>
            <th>Community ID</th>
            <th>Community Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {communities.map((community, index) => {
            return (
              <tr key={index}>
                <td>{community.communityID}</td>
                <td>{community.communityName}</td>
                <td>
                  <button
                    onClick={(e) => {
                      setSelectedCommunity(community);
                      setToggleEditForm(true)
                    }}>Rename</button>
                  <button
                    onClick={() => {
                      setSelectedCommunity(community);
                      setToggleDelete(true)
                    }}>Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {toggleEditForm ? ReactDOM.createPortal(
        <CommunityUpdateForm
          handleFormSubmit={handleFormSubmit}
          closeModal={() => { setToggleEditForm(false) }}
          selectedCommunity={selectedCommunity}>
        </CommunityUpdateForm>,
        portalElement) : null}

      {toggleDelete ? ReactDOM.createPortal(
        <CommunityDelete
          handleFormSubmit={handleFormSubmit}
          closeModal={() => { setToggleDelete(false) }}
          selectedCommunity={selectedCommunity}>
        </CommunityDelete>,
        portalElement) : null}
    </main>
  );
}

export default Community;
