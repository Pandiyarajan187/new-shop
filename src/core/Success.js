import React from 'react'
import { Link } from 'react-router-dom'

function Success() {
  return (
    <div>Payment Successfully
      <Link to='/invoice'>
    <button className='btn btn-primary'>
      Click here to see Invoice
    </button>
    </Link>
    </div>
  )
}

export default Success