import { useEffect, useState } from "react";

function EmployeeCountAddForm({ empCountObj }) {

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
            <button>Save</button> 
        </form >
        
    )
}

export default EmployeeCountAddForm