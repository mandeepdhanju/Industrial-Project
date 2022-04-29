import { useEffect, useState } from "react";

function EmployeeCountUpdateForm({ empCountObj }) {

    const [empCount, setEmpCount] = useState({})

    useEffect(() => {
        function loadObj() {
            setEmpCount(empCountObj)
        }
        loadObj()
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        empCountObj = empCount
        console.log(empCount)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="employeeCountRange">EmployeeCount Range:</label>
            <input type="text" id="employeeCountRange" placeholder={empCountObj.employeeCountRange} onChange={(e) => setEmpCount({ ...empCount, employeeCountRange: e.target.value })}></input>
            <br />
            <label htmlFor="website">Website:</label>
            <input type="text" id="website" placeholder={empCountObj.website} onChange={(e) => setEmpCount({ ...empCount, website: e.target.value })}></input>
            <br />
            <label htmlFor="active">Active:</label>
            <input type="checkbox" checked={empCount.active ? true : false} onChange={(e) => { setEmpCount({ ...empCount, active: e.target.checked }) }}></input>
            <br />
            <button>Save</button>
        </form >

    )
}

export default EmployeeCountUpdateForm