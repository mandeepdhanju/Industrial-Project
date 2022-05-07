import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";

const API = process.env.REACT_APP_API_URL;
function Modal({ closeModal, row, getData }) {
  const {
    activeBranches,
    category: cat,
    inactiveBranches,
    organizationID,
    organizationName: orgName,
    subCategory: subCat,
    totalBranches,
    website: web,
    numberOfEmployees: numEmp,
  } = row.row.values;

  const [organizationName, setOrganizationName] = useState(orgName);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("_");
  const [subCategory, setSubCategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("_");
  const [website, setWebsite] = useState(web);

  const [employeeCount, setEmployeeCount] = useState([]);
  const [selectedEmployeeCount, setSelectedEmployeeCount] = useState("_");

  const submit = async function (e) {
    e.preventDefault();
    // insert update logic here
    const response = await axios.put(API + "organization/" + organizationID, {
      organizationName,
      website,
      employeeCountId: selectedEmployeeCount,
      active: true,
      categoryId: selectedCategory,
      subCategoryId: selectedSubCategory,
      // dont touch this active
    });
    getData();
    closeModal();
  };

  const getCategory = async function () {
    const response = await axios.get(API + "category");
    setCategory(response.data);
  };

  const getSubCategory = async function (catID) {
    if (catID === "_") return;
    const response = await axios.get(API + "subcategory/" + catID);
    setSubCategory(response.data);
  };

  const getEmployeeCount = async function () {
    const response = await axios.get(API + "employeecount/");
    setEmployeeCount(response.data);
  };
  // get the categories from the api
  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    getSubCategory(selectedCategory || cat);
  }, [selectedCategory]);

  useEffect(() => {
    getEmployeeCount();
  }, []);

  //setting the drop down values with the data from the database
  useEffect(() => {
    category.forEach((ca) => {
      if (ca.categoryName === cat) {
        setSelectedCategory(ca.categoryID);
      }
    });

    subCategory.forEach((sc) => {
      if (sc.subCategoryName === subCat) {
        setSelectedSubCategory(sc.subCategoryID);
      }
    });
    employeeCount.forEach((ec) => {
      if (ec.employeeCountRange === numEmp) {
        setSelectedEmployeeCount(ec.employeeCountID);
      }
    });
  }, [category, subCategory, employeeCount, cat, subCat, numEmp]);

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
          <select
            name="category"
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="_" disabled={true}>
              Select a category
            </option>
            {category.map((cat) => {
              if (cat.categoryName !== "") {
                return (
                  <option key={cat.categoryID} value={cat.categoryID}>
                    {cat.categoryName}
                  </option>
                );
              } else {
                return null;
              }
            })}
          </select>
          <label htmlFor="subCategory">Sub Category</label>
          <select
            name="subCategory"
            id="subCategory"
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
          >
            <option value="_" disabled={true}>
              Select a sub category
            </option>
            {subCategory.map((subCat) => {
              if (subCat.subCategoryName !== "") {
                return (
                  <option
                    key={subCat.subCategoryID}
                    value={subCat.subCategoryID}
                  >
                    {subCat.subCategoryName}
                  </option>
                );
              } else {
                return null;
              }
            })}
          </select>

          <label htmlFor="website">Website</label>
          <input
            id="website"
            placeholder={web}
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          ></input>

          <label htmlFor="employeeCount">Employee Count</label>
          <select
            name="employeeCount"
            id="employeeCount"
            value={selectedEmployeeCount}
            onChange={(e) => setSelectedEmployeeCount(e.target.value)}
          >
            <option value="_" disabled={true}>
              Select Employee count/range
            </option>
            {employeeCount.map((emp) => {
              if (emp.employeeCountRange !== "") {
                return (
                  <option key={emp.employeeCountID} value={emp.employeeCountID}>
                    {emp.employeeCountRange}
                  </option>
                );
              } else {
                return null;
              }
            })}
          </select>

          <button type="submit">Submit</button>
        </form>
        <button onClick={() => closeModal()}>Close Modal</button>
      </div>
    </div>
  );
}

function OrganizationEdit({ row, getData }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const portalElement = document.getElementById("modal");
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <button onClick={() => setIsOpen(true)}>Edit</button>
      {isOpen &&
        ReactDOM.createPortal(
          <Modal
            closeModal={() => setIsOpen(false)}
            row={row}
            getData={getData}
          />,
          portalElement
        )}
    </div>
  );
}

export default OrganizationEdit;
