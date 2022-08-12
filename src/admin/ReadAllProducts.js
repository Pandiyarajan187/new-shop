import React, { useState, useEffect , useContext} from 'react'
import { Link } from 'react-router-dom'
import { Toast } from '../Notify'
import { request } from "../utils/Request";
import authContext from '../context/authContext'

const ReadAllProducts = () => {
  const {allProducts , getAllProducts ,deleteProducts} = useContext(authContext)


    useEffect(() => {
        getAllProducts()
    },[])
    return (
        <div className="table-responsive">
            <table className="table table-stripped table-bordered">
                <thead className="table-dark">
                    <tr >
                        <th style={{color : "white"}}>#</th>
                        <th style={{color : "white"}}>Name</th>
                        <th style={{color : "white"}}>Price</th>
                        <th style={{color : "white"}}>Quantity</th>
                        <th style={{color : "white"}}>Sold</th>
                        <th style={{color : "white"}}>Shipping</th>
                        <th style={{color : "white"}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allProducts.map((value, key) => (
                        <tr key={key}>
                            <td>{key+1}</td>
                            <td>{value.name}</td>
                            <td>{value.price}</td>
                            <td>{value.quantity}</td>
                            <td>{value.sold}</td>
                            <td>{value.shipping ? 'Yes' : 'No '}</td>
                            <td>
                                <Link to= {`/update/product/${value._id}` }  className="btn btn-sm btn-outline-success">Edit</Link>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => deleteProducts(value._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ReadAllProducts