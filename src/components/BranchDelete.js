import React from 'react'

function BranchDelete({ selectedBranch, deactiveBranch, closeModal }) {

    const handleSubmit = () => {
        deactiveBranch(selectedBranch)
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
                <h1>You are about to mark {selectedBranch.branchName ?? "Branch ID " + selectedBranch.branchID} as INACTIVE. Please confirm</h1>
                <button onClick={handleSubmit}>Yes</button>
                <button onClick={closeModal}>Cancel</button>
            </div>
        </div>
    )
}

export default BranchDelete