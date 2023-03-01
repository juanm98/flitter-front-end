import React, { useState, useEffect, MouseEvent, ReactNode } from 'react'
import './profile.css'
import { Post } from '../../types/models'
import { useNavigate } from 'react-router'
import { deletePost } from '../../services/postService'
export type SingleProfileProps = {
  post: Post
  userId: number | undefined
  popPost: (id: number) => void
}
function SingleProfile({ post, userId, popPost }: SingleProfileProps): JSX.Element {
  const { id, title, desc, photo, user } = post
  const [deleting, setDeleting] = useState(false)
  const [actionVisible, setActionVisible] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleDeletePost = () => {
    try {
      setDeleting(true)
      deletePost(id)
        .then((res) => {
          popPost(id)
          navigate('/profiles')
          setDeleting(false)
          setActionVisible(false)
        })
        .catch((err) => {
          console.log(err)
          setDeleting(false)
        })
    } catch (err) { }
  }
  useEffect(() => {
    window.addEventListener('click', (e) => {
      const actions = document.querySelector('.profileActions')

      if (!actions?.contains(e.target as Node)) {
        setActionVisible(false)
      }
    })
  }, [])

  return (
    <div className="singleProfile">
      {userId && userId === user.id && (
        <div className="profileActions">
          <div
            className="dots"
            onClick={() => {
              setTimeout(() => {
                setActionVisible(true)
              }, 100)
            }}
          >
            <span>.</span>
            <span>.</span>
            <span>.</span>
            {actionVisible && (
              <div className="actions">
                <p
                  onClick={() => {
                    handleDeletePost()
                  }}
                >
                  <a href="#"> {!deleting ? 'Delete Post' : '🚀 Deleting...'}</a>
                </p>
                <p
                  onClick={() => {
                    navigate(`/edit-post/${id}`, {
                      state: {
                        post,
                      },
                    })
                  }}
                >
                  Edit post
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="user">
        <img className="userImage" src={user.profile.photo} alt="" />
        <span>{user.name}</span>
      </div>
      <a href={`/profiles/${id}`} className="post">
        <div className="title">{title}</div>
        <div className="imgContainer">
          <img className="postImage" src={photo} alt="" />
        </div>
        <div className="desc">{desc}</div>
      </a>
    </div>
  )
}

export default SingleProfile

