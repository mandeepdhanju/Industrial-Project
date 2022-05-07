import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;
function Modal({ row, getData, closeModal }) {
  const {
    active,
    activeBranches,
    category,
    inactiveBranches,
    organizationID,
    organizationName,
    subCategory,
    totalBranches,
    website,
    numberOfEmployees,
  } = row.row.values;

  const deleteOrganization = async function () {
    await axios.delete(API + "organization/" + organizationID);
    getData();
    closeModal();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: 20,
        backgroundColor: "rgba(0, 0, 0, 0.75)",
      }}
      onClick={closeModal}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          backgroundColor: "white",
          padding: "1rem",
          zIndex: 21,
        }}
      >
        <h1>Are you sure about that?</h1>
        <p>{`You are about to mark ${organizationName} in active as well as ${activeBranches} of its branches`}</p>
        <button onClick={() => closeModal()}>Cancel</button>
        <button onClick={() => deleteOrganization()}>Delete</button>
      </div>
    </div>
  );
}

function OrganizationDelete({ row, getData }) {
  const [isOpened, setIsOpened] = useState(false);
  const portalElement = document.getElementById("modal");
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <button onClick={() => setIsOpened(true)}>Delete</button>
      {isOpened &&
        ReactDOM.createPortal(
          <Modal
            closeModal={() => setIsOpened(false)}
            row={row}
            getData={getData}
          />,
          portalElement
        )}
    </div>
  );
}

export default OrganizationDelete;
