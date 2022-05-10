import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryUpdateForm from "./CategoryUpdateForm";
import CategoryCreate from './CategoryCreate'
import CategoryDelete from './CategoryDelete'
import ReactDOM from 'react-dom';

function Category() {
    const axios = require("axios");
    const PATH = process.env.REACT_APP_API_URL;
    const portalElement = document.getElementById("modal");

    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState({})

    const navigate = useNavigate();

    //Show Edit Form State
    const [toggleEditForm, setToggleEditForm] = useState(false);
    //Show Create Popup
    const [toggleCreate, setToggleCreate] = useState(false);
    //Show Delete Popup
    const [toggleDelete, setToggleDelete] = useState(false);

    useEffect(() => {
        async function loadCategories() {
            const response = await axios.get(PATH + "Category")
            console.log(response.data)
            setCategories(response.data)
        }
        loadCategories()
    }, [])

    function handleFormSubmit(newArray) {
        setCategories(newArray)
        setToggleEditForm(false)
        setToggleCreate(false)
        setToggleDelete(false)
    }

    return (
        <main>
            <div className="sidebar">
                {toggleCreate ? ReactDOM.createPortal(
                <CategoryCreate
                    handleFormSubmit={handleFormSubmit}
                    closeModal={() => { setToggleCreate(false) }}>
                </CategoryCreate>,
                portalElement) : null}

                <button onClick={() => setToggleCreate(true)}>Add New Category</button>
                    
            </div>
            <div className="category dropdown-page">

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Category Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {categories.map((category, index) => {
                            return (
                                <tr key={index} onClick={() => { navigate("/category/" + category.categoryID, { state: category }) }}>
                                    <td>{category.categoryID}</td>
                                    <td>{category.categoryName}</td>
                                    <td>
                                        <button className="icon edit" 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedCategory(category);
                                                setToggleEditForm(true)
                                            }}><i class="fa-solid fa-pen"></i></button>
                                        <button className="icon delete"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedCategory(category);
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

export default Category;
