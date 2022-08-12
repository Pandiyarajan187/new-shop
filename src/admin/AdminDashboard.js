import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import authContext from '../context/authContext'


function AdminDashboard() {
  const { user } = useContext(authContext)

  const isActive = (location, path) => {
    if (location.pathname === path) {
      return { color: 'red' }
    }
  }
  return (
    <div class="dropdown" >
      <ul>
        {user ?
          <li class="nav-link" style={{ paddingLeft: "600px" }}>
            {/* <Link to="/create" class="nav-link" >
          <i class="material-icons">category</i> Category
    </Link> */}
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Category
              </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <Link  to='/createcategory' class="dropdown-item" >Create Category</Link>
              {/* <a class="dropdown-item" >Update Category</a>
              <a class="dropdown-item" >Delete Category</a> */}
            </div>
          </li> : null}
      </ul>
      {/* <Link to="/create" class="nav-link" >
          <i class="material-icons">store</i> Product
    </Link> */}
      <ul >
        {user ?
          <li class="nav-item" style={{ paddingLeft: "600px" }} >
            {/* <Link to="/create" class="nav-link" >
          <i class="material-icons">category</i> Category
    </Link> */}
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Product
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
            <Link  to='/addproduct' class="dropdown-item" >CREATE PRODUCT</Link>
              <Link to='/all/product' class="dropdown-item" >VIEW PRODUCT</Link>
              {/* <a class="dropdown-item" href="#6">Delete Product</a> */}
            </div>
          </li> : null}
      </ul>
    </div>
  )
}

export default AdminDashboard

//style={isActive(location, '/update')}