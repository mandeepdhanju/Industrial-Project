import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const API = "https://localhost:5001/api/";
function Modal({ closeModal }) {
  const [organizationName, setOrganizationName] = useState("");
  const [website, setWebsite] = useState("");

  const [employeeCountList, setEmployeeCountList] = useState([]);
  const [selectedEmployeeCount, setSelectedEmployeeCount] = useState("None");

  const [comment, setComment] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const getEmployeeRange = async function () {
    const response = await axios.get(API + "employeecount/");
    // an employee count can be empty string for some reason so filter it out
    const filtered = response.data.filter(
      (emp) => emp.employeeCountRange.length > 0
    );
    setEmployeeCountList(filtered);
  };

  useEffect(() => {
    getEmployeeRange();
  }, []);
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
        <h1>Create Organization</h1>
        <form>
          <label htmlFor="organization">Organization Name*</label>
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
            required="true"
          ></input>

          <label htmlFor="employeeCount">Employee Count</label>
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
        </form>
        <button
          onClick={(e) => {
            e.stopPropagation();
            closeModal();
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

function OrganizationCreate() {
  const [isOpened, setIsOpened] = useState(false);
  const portal = document.getElementById("modal");
  return (
    <div>
      <button onClick={() => setIsOpened(true)}>Create Organization</button>
      {isOpened &&
        ReactDOM.createPortal(
          <Modal closeModal={() => setIsOpened(false)} />,
          portal
        )}
    </div>
  );
}

export default OrganizationCreate;
