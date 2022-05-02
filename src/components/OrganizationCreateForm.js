import axios from 'axios'
import React, { useEffect, useState } from 'react'

function OrganizationCreateForm({ pushToArray }) {
    const [org, setOrg] = useState()
    const [newOrg, setNewOrg] = useState()
    const PATH = "https://localhost:5001/api/Organization"

    //Using this as a placeholder until I can access the EmployeeCount controller endPoint
    const employeeCount = [{ EmployeeCountID: 1, EmployeeCountRange: "Less than 5" }, { EmployeeCountID: 2, EmployeeCountRange: "5-10" }, { EmployeeCountID: 3, EmployeeCountRange: "16-30" }]

    //Placeholder until I can access category controller Get endpoint
    const category = [{ CategoryID: 1, CategoryName: "Community Group/Organisation" }, { CategoryID: 2, CategoryName: "Business" }, { CategoryID: 3, CategoryName: "Local Institution" }]

    //Placeholder until I can access subCategory controller Get endpoint
    const subCategory = [{ SubCategoryID: 1, SubCategoryName: "Association" }, { SubCategoryID: 2, SubCategoryName: "Lodging" }, { SubCategoryID: 3, SubCategoryName: "Recycling Depot" }]

    const loadFormData = (form) => {
        form.preventDefault();
        // console.log(form.target.elements.numberOfEmployees.selectedOptions[0].innerText)
        let formData = form.target.elements
        setOrg({
            organizationName: formData.organizationName.value,
            website: formData.website.value,
            employeeCountId: parseInt(formData.numberOfEmployees.value),
            categoryId: parseInt(formData.category.value),
            subCategoryId: parseInt(formData.subCategory.value),
            comment: formData.comment.value,
            category: form.target.elements.category.selectedOptions[0].innerText,
            subCategory: form.target.elements.subCategory.selectedOptions[0].innerText,
            numberOfEmployees: form.target.elements.numberOfEmployees.selectedOptions[0].innerText
        })
    }
    useEffect(() => {
        if (!org) {
            return
        }
        async function createOrg() {
            const response = await axios.post(PATH, {
                OrganizationName: org.organizationName,
                Website: org.website,
                EmployeeCountId: org.employeeCountId,
                CategoryId: org.categoryId,
                SubCategoryId: org.subCategoryId,
                Comment: org.comment
            })
            // console.log(response.data)
            setNewOrg({
                ...org,
                organizationID: response.data,
                activeBranches: 0,
                active: true
            })
        }

        createOrg()
    }, [org])

    useEffect(() => {
        function updateTable() {
            if (!newOrg) {
                return
            }
            console.log(newOrg)
            pushToArray(newOrg)
        }
        updateTable()
    }, [newOrg])

    return (
        <div className='form-container'>
            <form onSubmit={loadFormData}>
                <label>Organization Name
                    <input type="text" name="organizationName" placeholder="Please enter the Business Legal Name"/>
                </label>
                
                
                <label>Website
                    <input type="text" name="website" placeholder="Business website"/>
                </label>

                <label>Number of employees
                    <select name="numberOfEmployees">
                        {employeeCount.map((ec, index) => {
                            return <option key={index} value={ec.EmployeeCountID}>{ec.EmployeeCountRange}</option>
                        })}
                    </select>
                </label>

                <label>Category
                    <select name="category">
                        {category.map((ec, index) => {
                            return <option key={index} value={ec.CategoryID}>{ec.CategoryName}</option>
                        })}
                    </select>
                </label>

                <label>SubCategory
                    <select name="subCategory">
                        {subCategory.map((ec, index) => {
                            return <option key={index} value={ec.SubCategoryID}>{ec.SubCategoryName}</option>
                        })}
                    </select>
                </label>

                <label>Comment [optional]
                    <textarea name="comment" placeholder='Add a comment'/>
                </label>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default OrganizationCreateForm