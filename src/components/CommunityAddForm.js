import axios from "axios";
import { useState } from "react";

function CommunityAddForm({ handleFormSubmit, closeModal }) {

    const PATH = process.env.REACT_APP_API_URL;
    const [communityName, setcommunityName] = useState({})
    const [errorMsg, setErrorMsg] = useState()

    async function addCommunity(e) {
        e.preventDefault();
        const response = await axios.post(PATH + "Community", {
            communityName: communityName
        })
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
                <form onSubmit={addCommunity}>
                    {errorMsg ? <div><p>{errorMsg}</p></div> : null}
                    <label htmlFor="communityName">Community Name:</label>
                    <input
                        type="text"
                        id="communityName"
                        required
                        onChange={(e) => setcommunityName(e.target.value.trim())}></input>
                    <br />
                    <button type="submit">Add</button>
                </form >
            </div>
        </div>
    )
}

export default CommunityAddForm