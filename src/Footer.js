import React from 'react'
import {Link} from 'react-router-dom'


function Footer() {
  return (
    <div>
        <div>
        <Link to='/SignUp'>
        <button  style={{leftPadding : '100% '}}
          type="submit"
          className="btn btn-primary ">
          Sign up
        </button></Link>
        <div style={{ color: 'black' }}> <h5>Already have an account</h5><Link to='/SignIn'>Login here</Link></div>
      </div>
    </div>
  )
}

export default Footer