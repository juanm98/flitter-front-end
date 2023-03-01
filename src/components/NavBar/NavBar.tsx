// npm modules
import { NavLink } from 'react-router-dom'
import './navbar.css'
import Logo from '../logo/Logo'
// types
import { User } from '../../types/models'

interface NavBarProps {
  user: User | null
  handleLogout: () => void
}

const NavBar = (props: NavBarProps): JSX.Element => {
  const { user, handleLogout } = props
  
  return (
    <nav className="container">
            <Logo />
            {user ? (
                <ul className="navlinks">
                    {/* <li>Welcome, {user.name}</li> */}
                    <li>
                        <NavLink to="/profiles">View Listings</NavLink>
                    </li>
                    {/* <li>
                        <NavLink to="/change-password">Change Password</NavLink>
                    </li> */}
                    <li>
                        <NavLink to="/create-post">Create Post</NavLink>
                    </li>
                    <li>
                        <NavLink to="" onClick={handleLogout}>
                            LOG OUT
                        </NavLink>
                    </li>
                </ul>
            ) : (
                <ul className="navlinks">
                    <li>
                        <NavLink to="/login">Log In</NavLink>
                    </li>
                    <li>
                        <NavLink to="/signup">Sign Up</NavLink>
                    </li>
                </ul>
            )}
        </nav>
  )
}

export default NavBar
