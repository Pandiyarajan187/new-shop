import React, { useContext } from 'react'
import { useState } from 'react'
import { request } from '../src/utils/Request'
import { useEffect } from 'react'
import authContext from './context/authContext'
import Card from './core/Card'
import Search from './core/Search'

const Home = () => {
    // const [productsBySell, setProductsBySell] = useState([])
    // const [productsByArrival, setProductsByArrival] = useState([])
    const { getProductsBySell, getProductsForSell, getProductsByArrival, getProductsForArrival } = useContext(authContext)

    useEffect(() => {
        getProductsByArrival()
        getProductsBySell()
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            <Search />
            <h1>Best Sold</h1>
            <div className="row">
                {getProductsForSell.map((value, key) => {
                    return <div className='col-md-3 pb-5' key={key}>
                        {console.log("*&^%$#@!@#$%^&*", value)}
                      <Card  product={value}/></div>
                })}
            </div>
            <hr />
            <h1>New Arrival</h1>
            <div className="row">
                {getProductsForArrival.map((value, key) => {
                    return <div className="col-md-3 pb-5" key={key}>
                      <Card  product={value}/></div> 
                })}
            </div>
        </div>
    )
}

export default Home
