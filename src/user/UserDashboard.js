import React , { useContext } from 'react'
import authContext from '../context/authContext'

function UserDashboard() {
  const {user ,token} = useContext(authContext)
  return (
    <h3 style={{ textAlign : 'center' , marginTop : '200px'}}>This is user Dashboard Page</h3>

  )
}

export default UserDashboard