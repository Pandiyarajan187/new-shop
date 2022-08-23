import React, { useContext, useEffect } from 'react'
import { Link, useNavigate, useLocation ,useParams } from 'react-router-dom'
import { isAuthenticated } from '../src/utils/Auth'
import { Toast } from './Notify'
import authContext from './context/authContext'


function Header() {
  let navigate = useNavigate()
  let location = useLocation()
  const params = useParams()
  const { user, token, userDashboard, signout ,totalItem ,totalCartFunc ,getUserCategory,getUserDetails} = useContext(authContext)
  // const {user} = user

console.log(getUserDetails);
var cart = JSON.parse(localStorage.getItem('cart'))

  const isActive = (location, path) => {
    if (location.pathname === path) {
      return { color: 'black' }
    }
  }
  console.log("totalItem",totalItem);

  return (
    <div>
      <>
        <ul className="navbar navbar-dark bg-primary">
          {/* <li className="nav-item"> */}
          {/* {!user ?
            <>
              <li class="nav-item">
                <Link to="/" class="nav-link" style={isActive(location, '/')}>
                  <i class="material-icons">home</i> Home
                </Link>
              </li>
            </> : null} */}


          {user && user?.role === 1 ?
            <li class="nav-item">
              <Link to="/admin/dashboard" class="nav-link" style={isActive(location, '/admin/dashboard')}>
                <i class="material-icons">dashboard</i>Admin Dashboard
              </Link>
              {console.log("Admin Role================>", user.role)}
            </li> : null
          }
          {user && user?.role === 0 ?
            <>
              <li class="nav-item">
                <div class="dropdown">
                  <button class="btn btn-primary" type="button" id="dropdownMenu2" data-toggle="dropdown">
                    Dashboard
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <Link to= '/profile' class="dropdown-item" type="button">Profile</Link>
                    <Link to="/shop" class="dropdown-item" type="button">Shop</Link>
                    <Link to="/SignIn" class="dropdown-item" type="button" onClick={signout}>Logout</Link>
                  </div>
                </div>
              </li>
              <li class="nav-item">
                <Link to="/Home" class="nav-link" style={isActive(location, '/Home')}>
                  <i class="material-icons">home</i> Home
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/shop" class="nav-link" style={isActive(location, '/shop')}>
                  <i class="material-icons">store</i> Shop
                </Link>
              </li>
              <li class="button-container nav-item iframe-extern">
                <Link to="/cart" class="btn  btn-primary btn-sm  text-white btn-round btn-block">
                  <i class="material-icons">shopping_cart</i> Cart
                  <span  style={{ paddingLeft: '10px' }}>{ cart && totalItem?.length === 0 ? '' : cart && totalItem?.length }</span>
                </Link>
              </li>

            </> : null
          }
          {user && token ?
            <>
             {/* <li class="nav-item">
                <Link to="/" class="nav-link" style={isActive(location, '/')}>
                  <i class="material-icons">home</i> Home
                </Link>
              </li> */}
              {/* <li class="nav-item">
                    <Link to="/Profile" class="nav-link" style={isActive(location, '/Profile')}>
                      <i class="material-icons">profile</i> Profiles
                    </Link>
                  </li>
              <li class="button-container nav-item iframe-extern">
                <Link to="/cart" class="btn  btn-primary btn-sm  text-white btn-round btn-block">
                  <i class="material-icons">shopping_cart</i> Cart
                  <span style={{ paddingLeft: '10px' }}>{totalItem() === 0 ? '' : totalItem()}</span>
                </Link>
              </li>
              <li class="nav-item">
                    <Link to="/Shop" class="nav-link" style={isActive(location, '/Shop')}>
                      <i class="material-icons">store</i> Shop
                    </Link>
                  </li> */}
              <li class="nav-item">
                <Link to="/SignIn" class="nav-link " onClick={signout}>
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
      {/* {console.log(getUserDetails)} */}
    </div>

  )
}

export default Header


// import React, { useContext } from "react";
// import { FaShoppingCart } from "react-icons/fa";
// import { CartContext } from "./CartContext";

// const Header = () => {
//   const [cartItems] = useContext(CartContext);
//   //Loop through the items and find the total count
//   const totalCount = cartItems.reduce(
//     (prevValue, currentValue) => prevValue + currentValue.count,
//     0
//   );
//   return (
//     <header>
//       <nav>
//         <div className="logo">CD Kart</div>
//         <div className="cart">
//           <FaShoppingCart size="24" />
//           {totalCount > 0 && <span className="cart_count">{totalCount}</span>}
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;