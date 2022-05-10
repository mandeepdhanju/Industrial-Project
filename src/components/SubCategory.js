import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import SubCategoryUpdateForm from "./SubCategoryUpdateForm";
import SubCategoryCreate from './SubCategoryCreate'
import SubCategoryDelete from './SubCategoryDelete'
import ReactDOM from 'react-dom';

function SubCategory() {
  const axios = require("axios");
  const PATH = process.env.REACT_APP_API_URL;
  const portalElement = document.getElementById("modal");

  const [subcategories, setSubCategories] = useState([])
  const [selectedSubCategory, setSelectedSubCategory] = useState({})

  const { categoryID } = useParams();
  const location = useLocation();

  //Show Edit Form State
  const [toggleEditForm, setToggleEditForm] = useState(false);
  //Show Create Popup
  const [toggleCreate, setToggleCreate] = useState(false);
  //Show Delete Popup
  const [toggleDelete, setToggleDelete] = useState(false);

  useEffect(() => {
    async function SubloadCategories() {
      const response = await axios.get(PATH + "SubCategory/" + categoryID)
      setSubCategories(response.data)
    }
    SubloadCategories()
  }, [])

  function handleFormSubmit(newArray) {
    setSubCategories(newArray)
    setToggleEditForm(false)
    setToggleCreate(false)
    setToggleDelete(false)
  }

  return (
    <main>
      <div className="sidebar">
      {toggleCreate ? ReactDOM.createPortal(
          <SubCategoryCreate
            handleFormSubmit={handleFormSubmit}
            closeModal={() => { setToggleCreate(false) }}>
          </SubCategoryCreate>,
          portalElement) : null}

        <button onClick={() => setToggleCreate(true)}>Add New SubCategory</button>
      </div>
      <div className="subcategory dropdown-page">
        {location.state == null ?
          <h1>SubCategoryes for Category ID {categoryID}</h1> :
          <h1>SubCategories for {location.state.categoryName}</h1>
        }
        <table>
          <thead>
            <tr>
              <th>SubCategory ID</th>
              <th>SubCategory Name</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {subcategories.map((subCategory, index) => {
              return (
                <tr key={index}>
                  <td>{subCategory.subCategoryID}</td>
                  <td>{subCategory.subCategoryName}</td>
                  <td>
                    <button className="icon edit" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSubCategory(subCategory);
                        setToggleEditForm(true)
                      }}><i class="fa-solid fa-pen"></i></button>

                    <button className="icon delete" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSubCategory(subCategory);
                        setToggleDelete(true)
                      }}><i class="fa-solid fa-ban"></i></button>

                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {toggleEditForm ? ReactDOM.createPortal(
        <SubCategoryUpdateForm
          handleFormSubmit={handleFormSubmit}
          closeModal={() => { setToggleEditForm(false) }}
          selectedSubCategory={selectedSubCategory}>
        </SubCategoryUpdateForm>,
        portalElement) : null}

      {toggleDelete ? ReactDOM.createPortal(
        <SubCategoryDelete
          handleFormSubmit={handleFormSubmit}
          closeModal={() => { setToggleDelete(false) }}
          selectedSubCategory={selectedSubCategory}>
        </SubCategoryDelete>,
        portalElement) : null}
    </main>
  );
}

export default SubCategory;
