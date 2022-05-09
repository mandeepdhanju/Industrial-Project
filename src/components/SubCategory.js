import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CategoryUpdateForm from "./CategoryUpdateForm";
import CategoryCreate from './CategoryCreate'
import CategoryDelete from './CategoryDelete'
import ReactDOM from 'react-dom';

function Community() {
  const axios = require("axios");
  const PATH = process.env.REACT_APP_API_URL;
  const portalElement = document.getElementById("modal");

  const [subcategories, SubsetCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState({})

  const navigate = useNavigate();
  const { categoryID } = useParams();

  //Show Edit Form State
  const [toggleEditForm, setToggleEditForm] = useState(false);
  //Show Create Popup
  const [toggleCreate, setToggleCreate] = useState(false);
  //Show Delete Popup
  const [toggleDelete, setToggleDelete] = useState(false);

  useEffect(() => {
    async function SubloadCategories() {
      const response = await axios.get(PATH + "SubCategory/" + categoryID)
      console.log(response.data)
      SubsetCategories(response.data)
    }
    SubloadCategories()
  }, [])

  function handleFormSubmit(newArray) {
    SubsetCategories(newArray)
    setToggleEditForm(false)
    setToggleCreate(false)
    setToggleDelete(false)
  }

  return (
    <main>
      {toggleCreate ? ReactDOM.createPortal(
        <CategoryCreate
          handleFormSubmit={handleFormSubmit}
          closeModal={() => { setToggleCreate(false) }}>
        </CategoryCreate>,
        portalElement) : null}

      <button onClick={() => setToggleCreate(true)}>Add New SubCategory</button>
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
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCategory(subCategory);
                      setToggleEditForm(true)
                    }}>Rename</button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCategory(subCategory);
                      setToggleDelete(true)
                    }}>Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {toggleEditForm ? ReactDOM.createPortal(
        <CategoryUpdateForm
          handleFormSubmit={handleFormSubmit}
          closeModal={() => { setToggleEditForm(false) }}
          selectedCategory={selectedCategory}>
        </CategoryUpdateForm>,
        portalElement) : null}

      {toggleDelete ? ReactDOM.createPortal(
        <CategoryDelete
          handleFormSubmit={handleFormSubmit}
          closeModal={() => { setToggleDelete(false) }}
          selectedCategory={selectedCategory}>
        </CategoryDelete>,
        portalElement) : null}
    </main>
  );
}

export default Community;
