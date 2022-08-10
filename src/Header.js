import React , { useContext , useEffect } from 'react'
import { Link , useNavigate , useLocation } from 'react-router-dom'
import { isAuthenticated } from '../src/utils/Auth'
import { Toast } from './Notify'
import authContext from './context/authContext'


function Header() {
    let navigate = useNavigate()
    let location = useLocation()
    const {user , token , userDashboard , signout} = useContext(authContext)
    // const {user} = user

    useEffect (()=>{
        userDashboard()
    },[])



      const isActive = (location, path) => {
        if (location.pathname === path) {
          return { color: 'red' }
        } 
      }

    return (
        <div>
            <>
       <ul className="navbar navbar-dark bg-primary">
                {/* <li className="nav-item"> */}
                {!user ?
                <>
                    <li class="nav-item">
                <Link to="/" class="nav-link" style={isActive(location, '/')}>
                      <i class="material-icons">home</i> Home
                </Link>
                </li>
                </> : null }     

                {user && user?.role === 0  ? 
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
              {user && user?.role === 1 ?
                 <li class="nav-item">
                 <Link to="/admin/dashboard" class="nav-link" style={isActive(location, '/admin/dashboard')}>
                   <i class="material-icons">dashboard</i>Admin Dashboard
                 </Link>
                   {console.log("Admin Role================>",user.role)}
               </li> : null
              }
                {user && token ? 
                <>
                  {/* <li class="nav-item">
                    <Link to="/Profile" class="nav-link" style={isActive(location, '/Profile')}>
                      <i class="material-icons">profile</i> Profiles
                    </Link>
                  </li> */}
                  {/* <li class="button-container nav-item iframe-extern">
                    <Link to="/cart" class="btn  btn-danger btn-sm  text-white btn-round btn-block">
                    { totalItem() === 0 ? '' : totalItem() }
                    <i class="material-icons">shopping_cart</i> Cart
                    </Link>
                  </li> */}
                  {/* <li class="nav-item">
                    <Link to="/Shop" class="nav-link" style={isActive(location, '/Shop')}>
                      <i class="material-icons">store</i> Shop
                    </Link>
                  </li> */}
                  <li class="nav-item">
                    <Link to="" class="nav-link " onClick={ signout }>
                      Sign Out
                    </Link>
                  </li>
                </>
                :
                <>
                  <li class="nav-item">
                    <Link to="/SignUp" class="nav-link" style={isActive(location, '/SignUp')}>
                      SignUp
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link to="/SignIn" class="nav-link" style={isActive(location, '/SignIn')}>
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