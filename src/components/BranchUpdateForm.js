import axios from "axios";
import { useEffect, useRef, useState } from "react";

function BranchUpdateForm({ orgObj }) {

    const PATH = "https://localhost:5001/api/"
    const [org, setOrg] = useState({})
    const [readyOrg, setReadyOrg] = useState(false)

    const refEmp = useRef()
    const refCat = useRef()
    const refSubCat = useRef()

    //Using this as a placeholder until I can access the EmployeeCount controller endPoint
    const employeeCount = [{ EmployeeCountID: 1, EmployeeCountRange: "Less than 5" }, { EmployeeCountID: 2, EmployeeCountRange: "5-10" }, { EmployeeCountID: 3, EmployeeCountRange: "16-30" }]

    //Placeholder until I can access category controller Get endpoint
    const category = [{ CategoryID: 1, CategoryName: "Community Group/Organisation" }, { CategoryID: 2, CategoryName: "Business" }, { CategoryID: 3, CategoryName: "Local Institution" }]

    //Placeholder until I can access subCategory controller Get endpoint
    const subCategory = [{ SubCategoryID: 1, SubCategoryName: "Association" }, { SubCategoryID: 2, SubCategoryName: "Lodging" }, { SubCategoryID: 3, SubCategoryName: "Recycling Depot" }]

    useEffect(() => {
        function loadObj() {
            setOrg(orgObj)
        }
        loadObj()
    }, [])

    async function prepareData(e) {
        e.preventDefault();
        //Handle dropdowns
        setReadyOrg({
            ...org,
            EmployeeCountID: parseInt(refEmp.current[refEmp.current.selectedIndex].value),
            CategoryID: parseInt(refCat.current[refCat.current.selectedIndex].value),
            SubCategoryID: parseInt(refSubCat.current[refSubCat.current.selectedIndex].value)
        })
    }

    useEffect(() => {
        async function SubmitPutRequest() {
            if (readyOrg === false) {
                return
            }
            const response = await axios.put(PATH + "Organization/" + org.organizationID, {
                Active: readyOrg.active,
                EmployeeCountID: readyOrg.EmployeeCountID,
                CategoryId: readyOrg.CategoryID,
                SubCategoryId: readyOrg.SubCategoryID,
                OrganizationId: readyOrg.organizationID,
                OrganizationName: readyOrg.organizationName,
                Website: readyOrg.website
            })
            console.log(response)
        }
        SubmitPutRequest()
    }, [readyOrg])

    // async function getNumberOfEmployees() {
    //     var response = await axios.get(PATH)
    // }

    return (
        <form onSubmit={prepareData}>
            <label htmlFor="organizationName">Organization Name:</label>
            <input type="text" id="organizationName" placeholder={orgObj.organizationName} onChange={(e) => setOrg({ ...org, organizationName: e.target.value })}></input>
            <br />
            <label htmlFor="website">Website:</label>
            <input type="text" id="website" placeholder={orgObj.website} onChange={(e) => setOrg({ ...org, website: e.target.value })}></input>
            <br />
            <label htmlFor="website">Number of Employees:</label>

            <select ref={refEmp}>
                {employeeCount.map((ec, index) => {
                    return <option key={index} value={ec.EmployeeCountID}>{ec.EmployeeCountRange}</option>
                })}
            </select>

            <br />
            <label htmlFor="website">Category:</label>
            <select ref={refCat}>

                {category.map((ec, index) => {
                    return <option key={index} value={ec.CategoryID}>{ec.CategoryName}</option>
                })}
            </select>

            <br />
            <label htmlFor="website">SubCategory:</label>
            <select ref={refSubCat}>
                {subCategory.map((ec, index) => {
                    return <option key={index} value={ec.SubCategoryID}>{ec.SubCategoryName}</option>
                })}
            </select>

            <br />
            <label htmlFor="active">Active:</label>
            <input type="checkbox" checked={org.active ? true : false} onChange={(e) => { setOrg({ ...org, active: e.target.checked }) }}></input>
            <br />
            <button type="submit">Save</button>
        </form >

    )
}

export default BranchUpdateForm