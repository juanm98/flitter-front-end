import { AllComments, Comment } from '../types/models'
import * as tokenService from './tokenService'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/comments`

export type MiscCommentReturn = {
    type: string
    message: string
}
async function getComments(postId: number, offset: number, limit: number = 5): Promise<AllComments> {
    try {
        const res = await fetch(`${BASE_URL}/?offset=${offset}&limit=${limit}&postId=${postId}`, {
            headers: { Authorization: `Bearer ${tokenService.getToken()}`, 'Content-Type': 'application/json' },
        })
        return (await res.json()) as AllComments
    } catch (error) {
        throw error
    }
}

async function deleteComments(id: number): Promise<MiscCommentReturn> {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${tokenService.getToken()}` },
        })
        return { type: 'success', message: 'Comment deleted successfully' }
    } catch (error) {
        console.log(error)
        return { type: 'error', message: 'Error fetching comments' }
    }
}

async function createComment(postId: string, comment: string): Promise<Comment> {
    if (!comment.length) throw Error('Please provide comment')
    try {
        const res = await fetch(`${BASE_URL}/`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${tokenService.getToken()}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ postId, comment }),
        })
        return (await res.json()) as Comment
    } catch (error) {
        throw error
    }
}

export { 
  getComments, 
  deleteComments, 
  createComment 
}