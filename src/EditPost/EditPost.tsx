import React, { ChangeEvent, FormEvent, ReactElement, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate, useLocation } from 'react-router'
import './editPost.css'
import { editPost } from '../services/postService'
const EditPost = (): JSX.Element => {
    const location = useLocation()
    const navigate = useNavigate()

    const [editing, setEditing] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    if (!location.state) {
        navigate('/')
    }
    const [post, setPost] = useState({
        id: location.state.post.id,
        title: location.state.post.title,
        desc: location.state.post.desc,
        image: location.state.post.photo,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setPost({ ...post, [e.target.name]: e.target.value })
    };
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const fileElement: HTMLFormElement | null = document.querySelector('#photoEdit')
        if (fileElement) {
            const formData = new FormData()
            if (fileElement.files?.length) {
                formData.append('photo', fileElement.files[0])
                formData.append('isImageUpdated', 'true')
            }
            formData.append('title', post.title)
            formData.append('desc', post.desc)
            formData.append('image', post.image)
            formData.append('id', post.id)
            setEditing(true)
            editPost(formData)
                .then((res) => {
                    setEditing(false)
                    navigate(`/profiles/${post.id}`)
                })
                .catch((err) => {
                    setError('Error creating profile')
                    setEditing(false)
                })
        }
    }

    return (
        <div className="editPostContainer">
            <h2>Edit Post</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group col">
                    <label htmlFor="title">Title</label>
                    <input onChange={handleChange} value={post.title} type="text" name="title" id="title" required />
                </div>
                <div className="form-group">
                    <label htmlFor="photo">Add photo:</label>
                    <input type="file" name="photo" id="photoEdit" />
                </div>
                <div className="form-group col">
                    <label htmlFor="desc">Description</label>
                    <input onChange={handleChange} value={post.desc} name="desc" id="desc"></input>
                </div>
                <button type="submit">{!editing ? 'Submit' : '🚀 Editing...'}</button>
            </form>
        </div>
    )
}

export default EditPost