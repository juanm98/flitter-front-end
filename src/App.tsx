// npm modules 
import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// page components
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import CreatePost from './components/CreatePost/CreatePost'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'
import * as postServices from './services/postService'
import { useEffect } from 'react'

// stylesheets
import './App.css'

// types
import { User, Post, AllPosts } from './types/models'
import SingleProfile from './pages/SingleProfile/Singleprofile'
import { ToastContainer } from 'react-toastify'

function App(): JSX.Element {
  const navigate = useNavigate()
  
  const [user, setUser] = useState<User | null>(authService.getUser())
  const [posts, setPosts] = useState<Post[]>([])
  const [offSet, setOffset] = useState<number>(0)
  const fetchProfiles = async (): Promise<void> => {
      try {
          const profileData: AllPosts = await postServices.getAllPosts(offSet, 10)
          setPosts(profileData.posts)
          setOffset(offSet + profileData.posts.length)
      } catch (error) {
          console.log(error)
      }
  };

  const appendData = (post: Post) => {
      if (user) {
          const newPosts: Post[] = [{ ...post, user }, ...posts]
          setPosts(newPosts)
          setOffset(offSet + 1)
      }
  };

  const popPost = (postId: number) => {
      const newPosts: Post[] = posts.filter((post) => post.id !== postId)
      setPosts(newPosts)
      setOffset(offSet - 1)
  }

  useEffect((): void => {
      fetchProfiles()
  }, [])

  const handleLogout = (): void => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleAuthEvt = (): void => {
    setUser(authService.getUser())
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/signup"
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/login"
          element={<Login handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profiles/:id"
          element={
            <ProtectedRoute user={user}>
              <SingleProfile user={user} popPost={popPost} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-post"
          element={
            <ProtectedRoute user={user}>
              <CreatePost appendData={appendData} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-post/:id"
          element={
            <ProtectedRoute user={user}>
              <EditPost />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
