import React, { useState } from 'react'
import axios from "axios";
import { useParams } from "react-router-dom";

function BranchDelete({ selectedBranch, closeModal, handleFormSubmit }) {

    const PATH = process.env.REACT_APP_API_URL;
    const { organizationID } = useParams()
    const [errorMsg, setErrorMsg] = useState()

    async function deactiveBranch(branch) {
        const response = await axios.delete(`${PATH}Branch/${branch.branchID}`)
        if (response.data.error) {
            setErrorMsg(response.data.error)
            return
        }
        const branchArray = await axios.get(PATH + "Branch/" + organizationID)
        handleFormSubmit(branchArray.data)
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
                {errorMsg ? <div className="errorBox"><p>{errorMsg}</p></div> : null}
                <h1>You are about to mark {selectedBranch.branchName ?? "Branch ID " + selectedBranch.branchID} as INACTIVE. Please confirm</h1>
                <button onClick={() => { deactiveBranch(selectedBranch) }}>Yes</button>
                <button onClick={closeModal}>Cancel</button>
            </div>
        </div>
    )
}

export default BranchDelete