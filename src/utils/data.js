import React, { useContext } from 'react'
import authContext from '../context/authContext'
import CartHelpers from '../utils/CartHelpers'

function data() {
    const {allProducts } = useContext(authContext)
  return (
    <div>
        <CartHelpers allProducts={allProducts} />
    </div>
  )
}

export default data