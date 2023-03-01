import React, { useEffect, useState } from 'react'
import './singleProfile.css'
import SingleProfileComponent from '../../components/Profile/SingleProfile'
import CommentComponent from '../../components/Comment/Comment'
import { Post, Comment, AllComments, User } from '../../types/models'
import { redirect, useParams } from 'react-router'
import { getAllPosts, getSinglePost } from '../../services/postService'
import { createComment, getComments, deleteComments } from '../../services/commentServices'
import { toast } from 'react-toastify'
export type SingleProfileProps = {
  user: User | null
  popPost: (postId: number) => void
}
function SingleProfile({ user, popPost }: SingleProfileProps): JSX.Element {
  console.log(user)
  const { id } = useParams()

  const [post, setPost] = useState<Post | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [totalComments, setTotalComments] = useState<number>(0)

  const fetchPost = async () => {
    if (id) {
      try {
        const fetchedPost: Post = await getSinglePost(parseInt(id))
        console.log(fetchedPost)
        setPost(fetchedPost)
      } catch (err) {
        toast.error('Couldnot fetch post')
        redirect('/')
      }
    }
  }

  const fetchComments = async () => {
    if (id) {
      try {
        const fetchedComments: AllComments = await getComments(parseInt(id), comments.length, 6)
        setTotalComments(fetchedComments.totalComments)
        if (comments.length < fetchedComments.totalComments) {
          const newSetOfComments = comments.concat(fetchedComments.comments)
          setComments(newSetOfComments)
        }
      } catch (err) {
        console.log(err)
        toast.error('Couldnot fetch comments')
      }
    }
  }

  const addComment = async (comment: string) => {
    try {
      if (id && user) {
        const res: Comment = await createComment(id, comment)

        setTotalComments(totalComments + 1)
        const newComments: Comment[] = [
          {
            id: res.id,
            content: comment,
            userId: user.id,
            postId: parseInt(id),
            user: user,
          },
          ...comments,
        ]
        setComments(newComments)
      }
    } catch (error) { }
  }

  const handleDeleteComment = async (id: number) => {
    deleteComments(id).then(() => {
      const newComments: Comment[] = comments.filter((comment) => comment.id != id)
      setComments(newComments)
    })
  }

  useEffect(() => {
    fetchPost().then((res) => {
      fetchComments().then((res) => { })
    })
  }, [])

  return (
    <div className="singleprofilepage">
      {post ? (
        <div className="container">
          <SingleProfileComponent popPost={popPost} userId={user?.id} post={post} />
          <div className="comment">
            {user && (
              <CommentComponent
                handleDelete={handleDeleteComment}
                userId={user.id}
                comments={comments}
                addComment={addComment}
              />
            )}
          </div>
        </div>
      ) : (
        'loading...'
      )}
    </div>
  )
}

export default SingleProfile