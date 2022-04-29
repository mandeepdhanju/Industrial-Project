import { useEffect, useState } from "react";

const path = "https://localhost:5001/api/"

function CommunityUpdateForm({ commObj }) {

    const [community, setCommunity] = useState({})

    useEffect(() => {
        function loadObj() {
            setCommunity(commObj)
        }
        loadObj()
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        commObj = community
        console.log(community)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="communityName">Community Name:</label>
            <input type="text" id="communityName" placeholder={commObj.communityName} onChange={(e) => setCommunity({ ...community, communityName: e.target.value })}></input>
            <br />
            <label htmlFor="website">Website:</label>
            <input type="text" id="website" placeholder={commObj.website} onChange={(e) => setCommunity({ ...community, website: e.target.value })}></input>
            <br />
            <label htmlFor="active">Active:</label>
            <input type="checkbox" checked={community.active ? true : false} onChange={(e) => { setCommunity({ ...community, active: e.target.checked }) }}></input>
            <br />
            <button>Save</button>
        </form >

    )
}

export default CommunityUpdateForm