import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import EmployeeCountUpdateForm from "./EmployeeCountUpdateForm";
import EmployeeCountAddForm from "./EmployeeCountAddForm";
import EmployeeCountDelete from "./EmployeeCountDelete";

function EmployeeCount() {
  const axios = require("axios");
  const path = process.env.REACT_APP_API_URL;
  const portalElement = document.getElementById("modal");

  const [empCount, setEmpCount] = useState([]);
  const [selectedEmpCount, setSelectedEmpCount] = useState({});

  //Show Edit Form State
  const [toggleEditForm, setToggleEditForm] = useState(false);
  //Show Create Popup
  const [toggleCreate, setToggleCreate] = useState(false);
  //Show Delete Popup
  const [toggleDelete, setToggleDelete] = useState(false);

  // let navigate = useNavigate();

  useEffect(() => {
    async function loadEmpCount() {
      const response = await axios.get(path + "EmployeeCount");
      console.log(response.data);
      setEmpCount(response.data);
    }
    loadEmpCount();
  }, []);

  function handleFormSubmit(newArray) {
    setEmpCount(newArray);
    setToggleEditForm(false);
    setToggleCreate(false);
    setToggleDelete(false);
  }

  return (
    <main>
      <div className="sidebar">
        {toggleCreate
          ? ReactDOM.createPortal(
              <EmployeeCountAddForm
                handleFormSubmit={handleFormSubmit}
                closeModal={() => {
                  setToggleCreate(false);
                }}
              ></EmployeeCountAddForm>,
              portalElement
            )
          : null}
           
        <button onClick={() => setToggleCreate(true)}>
          Add New EmployeeCount
        </button>

        </div>
        <div className="employeeCount dropdown-page">
        <table>
          <thead>
            <tr>
              <th>EmployeeCount ID</th>
              <th>EmployeeCount Range</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {empCount.map((employeeCount, index) => {
              return (
                <tr key={index}>
                  <td>{employeeCount.employeeCountID}</td>
                  <td>{employeeCount.employeeCountRange}</td>
                  <td>
                    <button className="icon edit"
                      onClick={(e) => {
                        setSelectedEmpCount(employeeCount);
                        setToggleEditForm(true);
                      }}
                    >
                       <i class="fa-solid fa-pen"></i>
                    </button>
                    <button className="icon delete"
                      onClick={() => {
                        setSelectedEmpCount(employeeCount);
                        setToggleDelete(true);
                      }}
                    >
                      <i class="fa-solid fa-ban"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {toggleEditForm
        ? ReactDOM.createPortal(
            <EmployeeCountUpdateForm
              handleFormSubmit={handleFormSubmit}
              closeModal={() => {
                setToggleEditForm(false);
              }}
              selectedEmpCount={selectedEmpCount}
            ></EmployeeCountUpdateForm>,
            portalElement
          )
        : null}

      {toggleDelete
        ? ReactDOM.createPortal(
            <EmployeeCountDelete
              handleFormSubmit={handleFormSubmit}
              closeModal={() => {
                setToggleDelete(false);
              }}
              selectedEmpCount={selectedEmpCount}
            ></EmployeeCountDelete>,
            portalElement
          )
        : null}
    </main>
  );
}

export default EmployeeCount;
