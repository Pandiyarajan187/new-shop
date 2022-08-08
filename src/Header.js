import React , {useContext} from 'react'
import { Link , useNavigate , useLocation } from 'react-router-dom'
import { isAuthenticated } from './utils/Auth'
import { Toast } from './Notify'
import authContext from './context/authContext'


function Header() {
    let navigate = useNavigate()
    let location = useLocation()
    const {user} = useContext(authContext)


    const SignOut = () => {
        localStorage.removeItem('token')
        navigate('/')
        return Toast.fire({ icon: 'success' ,title: 'Sign out successfully.' })
      }

      const isAuthenticated = () => {
        var token = localStorage.getItem('token')
        if (token) {
          return JSON.parse(token)
        }
        return false
      }

      const isActive = (location, path) => {
        if (location.pathname === path) {
          return { color: 'red' }
        } else {
          return { color: location.pathname === '/SignIn' ? 'red' : 'white' }
        }
      }

    return (
        <div>
            <>
            <ul className="navbar navbar-dark bg-primary">
                {/* <li className="nav-item"> */}
                {!isAuthenticated() ?
                <>
                <Link to="/" class="nav-link" style={isActive(location, '/')}>
                      <i class="material-icons">home</i> Home
                </Link>
                {/* <Link to="/shop" class="nav-link" style={isActive(location, '/shop')}>
                      <i class="material-icons">store</i> Shop
                </Link> */}
                </> : null }
                {isAuthenticated() && isAuthenticated().user.role === 0 ? 
                <>
                  <li class="nav-item">
                    <Link to="/" class="nav-link" style={isActive(location, '/')}>
                      <i class="material-icons">home</i> Home
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link to="/shop" class="nav-link" style={isActive(location, '/shop')}>
                      <i class="material-icons">store</i> Shop
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link to="/user/dashboard" class="nav-link" style={isActive(location, '/user/dashboard')}>
                      <i class="material-icons">dashboard</i> Dashboard
                    </Link>
                  </li>
                </> : null 
              }
              {/* {isAuthenticated() && isAuthenticated().user.role === 1 ?
                <li class="nav-item">
                    <Link to="/admin/dashboard" class="nav-link" style={isActive(location, '/admin/dashboard')}>
                      <i class="material-icons">dashboard</i> Dashboard
                    </Link>
                </li> : null
              } */}
                {isAuthenticated() ? 
                <>
                  {/* <li class="button-container nav-item iframe-extern">
                    <Link to="/cart" class="btn  btn-danger btn-sm  text-white btn-round btn-block">
                      { totalItem() === 0 ? '' : totalItem() }
                      <i class="material-icons">shopping_cart</i> Cart
                    </Link>
                  </li> */}
                  <li class="nav-item">
                    <Link to="/Profile" class="nav-link" style={isActive(location, '/Profile')}>
                      <i class="material-icons">profile</i> Profile
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link to="/Shop" class="nav-link" style={isActive(location, '/Shop')}>
                      <i class="material-icons">store</i> Shop
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link to="/userDashboard" class="nav-link" style={isActive(location, '/userDashboard')}>
                      <i class="material-icons">dashboard</i> Dashboard
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link to="" class="nav-link " onClick={ SignOut }>
                      Sign Out
                    </Link>
                  </li>
                </>
                :
                <>
                  <li class="nav-item">
                    <Link to="/signup" class="nav-link" style={isActive(location, '/signup')}>
                      SignUp
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link to="/signin" class="nav-link" style={isActive(location, '/signin')}>
                      SignIn
                    </Link>
                  </li>
                </>
              }
            </ul>
            </>
        </div>
    )
}

export default Header