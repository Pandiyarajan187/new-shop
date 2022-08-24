import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { request } from '../utils/Request';
import CheckBox from './CheckBox';
import RadioBox from './RadioBox';
import { prices } from "../utils/FixedPrices";
import Card from './Card';
import authContext from '../context/authContext';
import { Toast } from '../Notify'
import 'react-toastify/dist/ReactToastify.css';
import { rest } from 'lodash';
import { useNavigate } from 'react-router-dom';
const Shop = () => {

    // const [categories, setCategories] = useState([])
    const {categories ,getBuyerCategory}= useContext(authContext)
    const navigate = useNavigate()
    const [limit, setLimit] = useState(9)
    const [skip, setSkip] = useState(0)
    const [size, setSize] = useState(0)
    const [trigger, setTrigger] = useState(false)
    const [myFilters,setMyFilters] = useState({
        filters: { category: [], price: [] }
    })
    const [filteredResults,setFilteredResults] = useState([])

    const loadFilterResults = async (newFilters) => {
        try {
            const data = {
                limit,
                skip,
                filters: newFilters
            }
            const res = await request('post', '/products/search', data)
            if (res) {
                console.log('SERACH data' , data);
                setFilteredResults(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getBuyerCategory()
        loadFilterResults(myFilters.filters)
    },[])
 

    const handleFilter = (filters, filterBy) => {
        const newFilters = { ...myFilters }
        // console.log("filters",filters);
        newFilters.filters[filterBy] = filters
        
        
        if(filterBy === 'price'){
            let priceValues = handlePrice(filters)
            console.log("filters",filters);
            newFilters.filters[filterBy] = priceValues
        }

        loadFilterResults(myFilters.filters)
        setMyFilters(newFilters)
    }

    const handlePrice = (value) => {
        const data = prices
        let array = []
        for(let key in data) {
            if(data[key]._id === parseInt(value))
            array = data[key].array


        }
        return array
    }
    const reset = () => {
        console.log('jhgvvvvvvvvvvvvvvvvvvvv')
        for (const checkbox of document.querySelectorAll('.check')) {
        checkbox.checked = false 
        // setMyFilters({
        //     filters: { category: [], price: [] }
        // })
        }
        for (const setvalue of document.querySelectorAll('.set')) {
            setvalue.checked = false 
        }
    setTrigger(!trigger)
    loadFilterResults(myFilters)
}
    return (
        <div class="container">
            <h2 class="section-title">Find what you need</h2>
                <div class="row">
                    <div class="col-md-2">
                        <div class="card card-refine card-plain card-rose">
                            <div class="card-body">
                            <h4 class="card-title">
                                Reset
                                <button class="btn btn-default btn-fab btn-fab-mini btn-link pull-right" rel="tooltip" title="" data-original-title="Reset Filter">
                                    <i onClick={reset} class="material-icons">cached</i>
                                </button>
                            </h4>
                            <div id="accordion" role="tablist">
                                <div class="card card-collapse">
                                    <div class="card-header" role="tab" id="headingTwo">
                                        <h5 class="mb-0">
                                            <a class="collapsed" data-toggle="collapse" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" style={{ color: "#9c27b0" }}>
                                                Filter By Categories
                                                <i class="material-icons">keyboard_arrow_down</i>
                                            </a>
                                        </h5>
                                    </div>
                                    <div id="collapseTwo" class="collapse" role="tabpanel" aria-labelledby="headingTwo">
                                        <div class="card-body">
                                            <CheckBox categories={categories} reset={reset}
                                            handleFilter={filters => handleFilter(filters, 'category')} trigger={trigger}/>
                                        </div>
                                    </div>
                                </div>
                                <div class="card card-collapse">
                                    <div class="card-header" role="tab" id="headingThree">
                                        <h5 class="mb-0">
                                            <a class="collapsed" data-toggle="collapse" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree" style={{ color: "#9c27b0" }}>
                                                Filter By Price Range
                                            <i class="material-icons">keyboard_arrow_down</i>
                                            </a>
                                        </h5>
                                    </div>
                                    <div id="collapseThree" class="collapse show" role="tabpanel" aria-labelledby="headingThree">
                                        <div class="card-body">
                                            <RadioBox prices={prices} trigger={trigger}
                                            handleFilter={filters => handleFilter(filters, 'price')}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-10">
                    <div class="row">
                        {filteredResults.length > 0 ? filteredResults.map((value, key) => {
                            return <div  className="col-md-4 pb-5" key={key}><Card  product={value}/></div>
                        }) : <h2 style={{paddingLeft : '340px'}} class="section-title">No Product Found</h2>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop
