import React from 'react'
import { Link } from 'react-router-dom'

function Navigation() {
    return (
        <div>
            <>
            <ul className="navbar navbar-dark bg-primary">
                {/* <li className="nav-item"> */}
                    <Link to='/'  className="nav-link active" >Home</Link><br></br>
                    <Link to='/SignUp'  className="nav-link active" >Register</Link><br></br>
                    <Link to='/SignIn'  className="nav-link active" >Login</Link><br></br>
                    <Link to='/Logout'  className="nav-link active" >Logout</Link><br></br>
                {/* </li> */}
            </ul>
            </>
        </div>
    )
}

export default Navigation