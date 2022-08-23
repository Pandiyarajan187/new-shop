import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authContext from '../context/authContext'
import 'bootstrap-css-only/css/bootstrap.min.css'; 



function UserDashboard() {
    const { signout } = useContext(authContext)
    return (
        <div class="dropdown">
            {/* <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown
            </button> */}
            <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                <button class="dropdown-item" type="button">Action</button>
                <button class="dropdown-item" type="button">Another action</button>
                <button class="dropdown-item" type="button">Something else here</button>
            </div>
        </div>

    )
}

export default UserDashboard



{/* <div class="row d-flex d-md-block flex-nowrap wrapper">
<div class="col-md-2 float-left col-1 pl-0 pr-0 collapse width show" id="sidebar">
    <div class="list-group border-0 card bg-faded text-center text-md-left">
        
        
        <Link to = "/" class="list-group-item d-inline-block collapsed" data-toggle="collapse" 
        data-parent="#sidebar" aria-expanded="false">
            
            <i class="fa fa-dashboard"></i> <span class="hidden-sm-down">Profile</span> </Link>&nbsp;

         <Link to = "/shop" class="list-group-item d-inline-block collapsed" data-parent="#sidebar">
            <i class="fa fa-film"></i> <span class="hidden-sm-down">Shop</span></Link>&nbsp;
            <Link to = "/cart" class="list-group-item d-inline-block collapsed" data-parent="#sidebar">
            <i class="fa fa-film"></i> <span class="hidden-sm-down">Cart</span></Link>&nbsp;
            <Link to = "" class="list-group-item d-inline-block collapsed" data-parent="#sidebar"  onClick={ signout }>
            <i class="fa fa-film"></i> <span class="hidden-sm-down">Logout</span></Link>&nbsp;
    </div>
</div>
    <Link to = "#" data-target="#sidebar" data-toggle="collapse"><i class="fa fa-navicon fa-lg py-2 p-1"></i></Link>

</div> */}
