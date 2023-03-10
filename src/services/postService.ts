import { Post, AllPosts } from '../types/models'
import * as tokenService from './tokenService'
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/posts`

export type PostMiscReturn = {
    type: string
    message: string
}

async function getAllPosts(offset: number, limit: number): Promise<AllPosts> {
    try {
        const res = await fetch(`${BASE_URL}/?offset=${offset}&limit=${limit}`, {
            headers: { Authorization: `Bearer ${tokenService.getToken()}` },
        })
        return (await res.json()) as AllPosts
    } catch (error) {
        throw error
    }
}

async function getSinglePost(id: number): Promise<Post> {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            headers: { Authorization: `Bearer ${tokenService.getToken()}` },
        })
        return (await res.json()) as Post
    } catch (error) {
        throw error
    }
}

async function createPost(postData: FormData): Promise<Post> {
    try {
        const res = await fetch(`${BASE_URL}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${tokenService.getToken()}`,
            },
            body: postData,
        })
        return (await res.json()) as Post
    } catch (err) {
        throw new Error('Error creating post')
    }
}

async function editPost(editData: FormData): Promise<Post | PostMiscReturn> {
    try {
        const res = await fetch(`${BASE_URL}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${tokenService.getToken()}`,
            },
            body: editData,
        })
        return (await res.json()) as Post
    } catch (err) {
        const error = {
            type: 'error',
            message: "Couldn't edit post",
        }
        return error
    }
}

async function deletePost(id: number): Promise<PostMiscReturn> {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${tokenService.getToken()}`,
            },
        })
        return { type: 'success', message: 'Post deleted successfully' }
    } catch (err) {
        throw err
    }
}



export {
    getAllPosts,
    getSinglePost,
    createPost,
    editPost,
    deletePost
}