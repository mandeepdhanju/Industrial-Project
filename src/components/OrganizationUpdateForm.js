import { useEffect, useState } from "react";

function OrganizationUpdateForm({ orgObj }) {

    const [org, setOrg] = useState({})

    useEffect(() => {
        function loadObj() {
            setOrg(orgObj)
        }
        loadObj()
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        orgObj = org
        console.log(org)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="organizationName">Organization Name:</label>
            <input type="text" id="organizationName" placeholder={orgObj.organizationName} onChange={(e) => setOrg({ ...org, organizationName: e.target.value })}></input>
            <br />
            <label htmlFor="website">Website:</label>
            <input type="text" id="website" placeholder={orgObj.website} onChange={(e) => setOrg({ ...org, website: e.target.value })}></input>
            <br />
            <label htmlFor="active">Active:</label>
            <input type="checkbox" checked={org.active ? true : false} onChange={(e) => { setOrg({ ...org, active: e.target.checked }) }}></input>
            <br />
            <button>Save</button>
        </form >

    )
}

export default OrganizationUpdateForm