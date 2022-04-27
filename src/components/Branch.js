import React from 'react'
import { useParams } from 'react-router-dom'

function Branch() {
    const { organizationID } = useParams()

    return (
        <div>Display info for organization {organizationID}</div>
    )
}

export default Branch