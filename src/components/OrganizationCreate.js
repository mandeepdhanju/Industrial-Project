import React, { useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;
function Modal({ closeModal, getData }) {
  const [organizationName, setOrganizationName] = useState("");
  const [website, setWebsite] = useState("");

  const [employeeCountList, setEmployeeCountList] = useState([]);
  const [selectedEmployeeCount, setSelectedEmployeeCount] = useState("None");

  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("None");

  const [subCategoryList, setSubCategoryList] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("None");

  const [comment, setComment] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const getEmployeeRange = async function () {
    const response = await axios.get(API + "employeecount/");
    // an employee count can be empty string for some reason so filter it out
    const filtered = response.data.filter(
      (emp) => emp.employeeCountRange.length > 0
    );
    setEmployeeCountList(filtered);
  };

  const getCategory = async function () {
    const response = await axios.get(API + "category/");
    // some categories are blank for some reason
    const filtered = response.data.filter((cat) => cat.categoryName.length > 0);
    setCategoryList(filtered);
  };

  // useCallback because useEffect complaint
  const getSubCategory = useCallback(async () => {
    if (selectedCategory === "None") return;
    const response = await axios.get(API + "subcategory/" + selectedCategory);
    // some subcategories are blank for some reason
    const filtered = response.data.filter(
      (subcat) => subcat.subCategoryName.length > 0
    );

    setSubCategoryList(filtered);
    // set the value to this to select the disabled select one option
    setSelectedSubCategory("None");
  }, [selectedCategory]);

  useEffect(() => {
    getEmployeeRange();
    getCategory();
  }, []);

  // get the subcat every time the cat changes
  useEffect(() => {
    getSubCategory();
  }, [selectedCategory, getSubCategory]);

  async function submit(e) {
    // make sure that the required fields are filled out
    e.preventDefault();
    let message = "";
    if (
      selectedEmployeeCount === "None" ||
      selectedCategory === "None" ||
      selectedSubCategory === "None" ||
      organizationName === ""
    ) {
      if (selectedEmployeeCount === "None")
        message += "Missing Employee Count. ";
      if (selectedCategory === "None") message += "Missing Category. ";
      if (selectedSubCategory === "None") message += "Missing Sub Category. ";
      if (organizationName === "") message += "Missing Organization Name. ";
      setErrorMessage(message);
      return;
    }
    await axios.post(API + "organization/", {
      organizationName: organizationName,
      website: website,
      employeeCountId: selectedEmployeeCount,
      categoryId: selectedCategory,
      subCategoryId: selectedSubCategory,
      comment: comment,
      // needs to be set to true for logic to work
      active: true,
    });
    // update the list of orgs
    getData();
    closeModal();
  }
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: 50000,
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
          zIndex: 500000000,
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button className="close-modal icon"
          onClick={(e) => {
            e.stopPropagation();
            closeModal();
          }}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h1>Create Organization</h1>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <form onSubmit={submit}>
          <label htmlFor="organization">Organization Name *</label>
          <input
            id="organization"
            type="text"
            placeholder="Organization Name"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
          ></input>

          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="text"
            placeholder="Website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          ></input>

          <label htmlFor="employeeCount">Employee Count *</label>
          <select
            name="employeeCount"
            id="employeeCount"
            value={selectedEmployeeCount}
            onChange={(e) => setSelectedEmployeeCount(e.target.value)}
          >
            <option value="null">None</option>
            {employeeCountList.map((emp, i) => {
              return (
                <option key={i} value={emp.employeeCountID}>
                  {emp.employeeCountRange}
                </option>
              );
            })}
          </select>

          <label htmlFor="comment">Comment</label>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></input>

          <label htmlFor="category">Category *</label>
          <select
            name="category"
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="None" disabled={true}>
              Select One
            </option>
            {categoryList.map((cat, i) => {
              return (
                <option key={i} value={cat.categoryID}>
                  {cat.categoryName}
                </option>
              );
            })}
          </select>

          <label htmlFor="subCategory">Sub Category *</label>
          <select
            name="subCategory"
            id="subCategory"
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
          >
            <option value="None" disabled={true}>
              Select One
            </option>
            {subCategoryList.map((subcat, i) => {
              return (
                <option key={i} value={subcat.subCategoryID}>
                  {subcat.subCategoryName}
                </option>
              );
            })}
          </select>
          <button className="submit" type="submit">Submit</button>
        </form>
        
      </div>
    </div>
  );
}

function OrganizationCreate({ getData }) {
  const [isOpened, setIsOpened] = useState(false);
  const portal = document.getElementById("modal");
  return (
    <div>
      <button onClick={() => setIsOpened(true)}>Create Organization</button>
      {isOpened &&
        ReactDOM.createPortal(
          <Modal closeModal={() => setIsOpened(false)} getData={getData} />,
          portal
        )}
    </div>
  );
}

export default OrganizationCreate;
