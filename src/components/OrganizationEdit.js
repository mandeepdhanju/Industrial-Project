import React, { useState } from "react";
import ReactDOM from "react-dom";

function Modal({ closeModal, row }) {
  const {
    activeBranches,
    category: cat,
    inactiveBranches,
    organizationID,
    organizationName: orgName,
    subCategory: subCat,
    totalBranches,
  } = row.row.values;

  const [organizationName, setOrganizationName] = useState(orgName);
  const [category, setCategory] = useState(cat);
  const [subCategory, setSubCategory] = useState(subCat);

  const submit = function () {
    // insert update logic here
    alert(`Submitting ${organizationName}`);
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
      onClick={(e) => {
        e.stopPropagation();
        closeModal();
      }}
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
        onClick={(e) => e.stopPropagation()}
      >
        <h1>Edit {orgName}</h1>
        <form onSubmit={submit}>
          <label htmlFor="orgName">Organization Name</label>
          <input
            id="orgName"
            placeholder={orgName}
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
          ></input>
          <label htmlFor="category">Category</label>
          <input
            id="category"
            placeholder={cat}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          ></input>
          <label htmlFor="subCategory">Sub Category</label>
          <input
            id="subCategory"
            placeholder={subCat}
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          ></input>
          <button type="submit">Submit</button>
        </form>
        <button onClick={() => closeModal()}>Close Modal</button>
      </div>
    </div>
  );
}

function OrganizationEdit({ row }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const portalElement = document.getElementById("modal");
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Edit</button>
      {isOpen &&
        ReactDOM.createPortal(
          <Modal closeModal={() => setIsOpen(false)} row={row} />,
          portalElement
        )}
    </div>
  );
}

export default OrganizationEdit;
