import { useEffect, useState } from "react";

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
            <button>Save</button> 
        </form >
    )
}

export default CommunityUpdateForm