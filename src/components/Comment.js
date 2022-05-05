import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Comment() {
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState()

    const { organizationID } = useParams()

    const PATH = "https://localhost:5001/api/Comment/"

    //Get comments on load
    useEffect(() => {
        async function getComments() {
            const response = await axios.get(PATH + organizationID)
            setComments(response.data)
        }
        getComments()
    }, [])

    async function addNewComment(e) {
        e.preventDefault();
        const response = await axios.post(PATH + organizationID,
            {
                comment: newComment
            })
        setComments(response.data)
        e.target.reset()
    }

    return (
        <div>
            {comments.map((comment) => {
                return (
                    <div key={comment.commentId}>
                        <p>{new Date(comment.created).toLocaleString()}</p>
                        <p>{comment.comment}</p>
                    </div>
                )
            })}
            <form onSubmit={(e) => { addNewComment(e) }}>
                <label htmlFor="Add a new comment"></label>
                <textarea onChange={(e) => setNewComment(e.target.value)}></textarea>
                <button type='submit'>Add</button>
            </form>
        </div>
    )
}

export default Comment