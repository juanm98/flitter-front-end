// npm packages
import { useState, useEffect } from 'react'
import { Route } from 'react-router'
import SingleProfile from '../../components/Profile/SingleProfile'
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute'

// services
import * as postServices from '../../services/postService'

// types
import { AllPosts, Post, Profile } from '../../types/models'

import './profileList.css'

export type ProfilesType = {
  posts: Post[]
  userId: number | undefined
  popPost: (id: number) => void
}
const Profiles = ({ posts, userId, popPost }: ProfilesType): JSX.Element => {
  if (!posts.length) return <p>No profiles yet</p>

  return (
    <div className="listContainer">
      <div className="profileListing">
        {posts.map((post: Post) => (
          <div>
            <SingleProfile popPost={popPost} userId={userId} post={post} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Profiles
