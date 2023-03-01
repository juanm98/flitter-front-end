import React, { ChangeEvent, FormEvent, ReactElement, useState } from 'react'
import { Post } from '../../types/models'
import { toast } from 'react-toastify'
import './createPost.css'
import { createPost } from '../../services/postService'
import { useNavigate } from 'react-router'
export type CreatePostProps = {
    appendData: (post: Post) => void
};
const CreatePost = ({ appendData }: CreatePostProps): JSX.Element => {
    const [post, setPost] = useState({
        title: '',
        desc: '',
    })
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)
    const submitHandler = (e: FormEvent) => {
        e.preventDefault()
        const fileElement: HTMLFormElement | null = document.querySelector('#photo')
        if (fileElement) {
            if (fileElement.files.length) {
                const formData = new FormData()
                formData.append('photo', fileElement.files[0])
                formData.append('title', post.title)
                formData.append('desc', post.desc)
                setLoading(true);
                createPost(formData)
                    .then((res: Post) => {
                        appendData(res)
                        setLoading(false)
                        navigate('/profiles')
                    })
                    .catch((err) => {
                        toast.error('Error creating post')
                        setError('Error creating profile')
                        setLoading(false)
                    });
            } else {
                toast.error('please upload photo')
            }
        }

        if (post.title.length && post.desc.length) {
        }
    };
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPost({ ...post, [e.target.name]: e.target.value })
        setError(null)
    };
    return (
        <div className="createpostcontainer">
            <h2>Create Post</h2>
            <form onSubmit={submitHandler}>
                {error && <span>{error}</span>}
                <div className="form-group col">
                    <label htmlFor="title">Title</label>
                    <input onChange={changeHandler} type="text" name="title" id="title" required />
                </div>
                <div className="form-group">
                    <label htmlFor="photo">Add photo:</label>
                    <input onChange={changeHandler} required type="file" name="photo" id="photo" />
                </div>
                <div className="form-group col">
                    <label htmlFor="desc">Description</label>
                    <input className="textarea" onChange={changeHandler} name="desc" id="desc"></input>
                </div>
                <button type="submit">{!loading ? 'submit' : '🚀 Creating...'}</button>
            </form>
        </div>
    )
}

export default CreatePost