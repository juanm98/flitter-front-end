import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import { Comment } from '../../types/models'
import './comment.css'
import { toast } from 'react-toastify'

type CommentProps = {
    comments: Comment[]
    addComment?: (comment: string) => Promise<void>
    userId: number
    handleDelete: (id: number) => Promise<void>
}
function CommentContainer({ comments, userId, addComment, handleDelete }: CommentProps): JSX.Element {
    const [comment, setComment] = useState<string>('')

    const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        console.log(e.target.value)
        setComment(e.target.value)
    }
    const submitHandler = (e: FormEvent): void => {
        e.preventDefault()
        if (addComment) {
            addComment(comment)
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => {
                    toast.error("Couldn't post comment.")
                })
        }
    }

    return (
        <div className="commentSection">
            <h3>Comments</h3>
            <div className="addComment">
                <form onSubmit={submitHandler}>
                    <input onChange={changeHandler} type="text" className="commentInput" placeholder="Add comment" />
                </form>
            </div>
            {comments.length ? (
                <CommentList handleDelete={handleDelete} userId={userId} comments={comments} />
            ) : (
                'No comments to show'
            )}
        </div>
    )
}

export default CommentContainer

function CommentList({ comments, userId, handleDelete }: CommentProps): JSX.Element {
    return (
        <div className="commentList">
            {comments.map((item) => (
                <CommentItem handleDelete={handleDelete} userId={userId} comment={item} />
            ))}
        </div>
    )
}

export type CommentItemProps = {
    comment: Comment
    userId: number
    handleDelete: (id: number) => Promise<void>
}
function CommentItem({ comment, userId, handleDelete }: CommentItemProps): JSX.Element {
    const [actionVisible, setActionVisible] = useState<boolean>(false)
    const [deleting, setDeleting] = useState(false)
    useEffect(() => {
        window.addEventListener('click', (e) => {
            const actions = document.querySelector('.commentActions')

            if (!actions?.contains(e.target as Node)) {
                setActionVisible(false)
            }
        })
    }, [])
    const onDelete = () => {
        try {
            handleDelete(comment.id)
            setActionVisible(false)
        } catch (err) {
            console.log('error ')
        }
    }
    return (
        <div className="commentItem">
            {userId === comment.user.id && (
                <div className="commentActions">
                    <div
                        onClick={() => {
                            setTimeout(() => {
                                setActionVisible(true)
                            }, 100)
                        }}
                        className="dots"
                    >
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                    </div>
                    {actionVisible && (
                        <div className="actions">
                            {!deleting ? (
                                <p
                                    onClick={() => {
                                        onDelete()
                                    }}
                                >
                                    Delete Post
                                </p>
                            ) : (
                                '🚀 Deleting...'
                            )}
                        </div>
                    )}
                </div>
            )}

            <div className="userInfo">
                <img src={comment.user.profile.photo || '/default.png'} alt="a random man" className="userImg" />
                <div className="userName">{comment.user.name}</div>
            </div>
            <div className="commentContent">{comment.content}</div>
        </div>
    );
}