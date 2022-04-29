import axios from "axios";
import { useEffect, useState } from "react";

function OrganizationUpdateForm({ orgObj }) {

    const PATH = "https://localhost:5001/api/"
    const [org, setOrg] = useState({})

    //Using this as a placeholder until I can access the EmployeeCount controller endPoint
    const employeeCount = ["Less than 5", "5-10", "16-30"]

    useEffect(() => {
        function loadObj() {
            setOrg(orgObj)
        }
        loadObj()
    }, [])

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(org)
        const response = await axios.put(PATH + "Organization/" + org.organizationID, {
            body: {
                Active: org.active,
                employeeCountRange: org.employeeCountRange,
                OrganizationId: org.organizationID,
                OrganizationName: org.organizationName,
                Website: org.website

            }
        })
        console.log(response)
    }

    async function getNumberOfEmployees() {
        var response = await axios.get(PATH)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="organizationName">Organization Name:</label>
            <input type="text" id="organizationName" placeholder={orgObj.organizationName} onChange={(e) => setOrg({ ...org, organizationName: e.target.value })}></input>
            <br />
            <label htmlFor="website">Website:</label>
            <input type="text" id="website" placeholder={orgObj.website} onChange={(e) => setOrg({ ...org, website: e.target.value })}></input>
            <br />
            <label htmlFor="website">Number of Employees:</label>
            <select onChange={(e) => setOrg({ ...org, employeeCountRange: e.target.value })}>
                {employeeCount.map((ec, index) => {
                    return <option key={index} value={ec}>{ec}</option>
                })}
            </select>
            <br />
            <label htmlFor="active">Active:</label>
            <input type="checkbox" checked={org.active ? true : false} onChange={(e) => { setOrg({ ...org, active: e.target.checked }) }}></input>
            <br />
            <button>Save</button>
        </form >

    )
}

export default OrganizationUpdateForm