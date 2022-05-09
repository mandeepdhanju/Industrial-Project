import React from 'react'
import axios from "axios";
import { useState } from "react";
import { useParams } from 'react-router-dom';

function SubCategoryDelete({ selectedSubCategory, handleFormSubmit, closeModal }) {
    const PATH = process.env.REACT_APP_API_URL;

    const { categoryID } = useParams()

    const [errorMsg, setErrorMsg] = useState()

    async function handleSubmit() {
        const response = await axios.delete(PATH + "SubCategory/" + categoryID + "/" + selectedSubCategory.subCategoryID)
        if (response.data.error) {
            setErrorMsg(response.data.error)
            return
        }
        handleFormSubmit(response.data.value)
    }

    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            zIndex: 5000,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
        }}
            onClick={closeModal}>

            <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                backgroundColor: "white",
                padding: "1rem",
                zIndex: 5001,
            }}
                onClick={(e) => { e.stopPropagation() }}
            >
                {errorMsg ? <div className='errorBox'><p>{errorMsg}</p></div> : null}
                <h1>You are about to mark {selectedSubCategory.subCategoryName} as NULL.
                    <p>The subcategory ID will not be deleted, but the subcategory cannot be reported</p>
                    Please confirm.
                </h1>
                <button onClick={() => { handleSubmit() }}>Yes</button>
                <button onClick={closeModal}>Cancel</button>
            </div>
        </div >
    )
}

export default SubCategoryDelete