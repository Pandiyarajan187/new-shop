import React, { useEffect, useMemo, useContext } from 'react'
import { useState } from 'react';
import { request } from '../utils/Request';
import CheckBox from './CheckBox';
import RadioBox from './RadioBox';
import { prices } from "../utils/FixedPrices";
import Card from './Card';
import authContext from "../context/authContext";

const Shop = () => {
    const { getBuyerCategory, categories } = useContext(authContext)

    const [categoryList, setCategoryList] = useState([]);
    const [checked, setChecked] = useState(false)

    const [selectedCategory, setSelectedCategory] = useState();
    const [limit, setLimit] = useState(6)
    const [skip, setSkip] = useState(0)
    const [size, setSize] = useState(0)
    const [myFilters,setMyFilters] = useState({
        filters: { category: [], price: [] }
    })

    // Add default value on page load
    useEffect(() => {
        getBuyerCategory()
        setCategoryList(categories);
    }, []);

    // Function to get filtered list
    function getFilteredList() {
        // Avoid filter when selectedCategory is null
        if (!selectedCategory) {
            return categoryList;
        }
        return categoryList.filter((item) => item.category === selectedCategory);
    }

    // Avoid duplicate function calls with useMemo
    var filteredList = useMemo(getFilteredList, [selectedCategory, categoryList]);

    const loadFilterResults = async (newFilters) => {
        try {
            const data = {
                limit,
                skip,
                filters: newFilters
            }
            const res = await request('post', '/products/search', data)
            if (res) {
                // setFilteredResults(res.data.data)
                setSize(res.data.size)
                setSkip(0)
            }
        } catch (error) {
            console.log(error)
        }
    }
    function handleCategoryChange(event) {
        loadFilterResults()
        setSelectedCategory(event.target.value);

    }
    //===============================================
    // Radio Button

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
                                    <i class="material-icons">cached</i>
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
                                            {/* <CheckBox categories={categories} onChange={handleCategoryChange} filteredList={filteredList}/> */}
                                            {categories.map((value, key) => {
                                                return <div class="form-check" key={key}>
                                                    <label class="form-check-label">
                                                        <input class="form-check-input" 
                                                        id={`check${key}`} 
                                                        name={`check${key}`} 
                                                        onChange={handleCategoryChange} 
                                                        type="checkbox" 
                                                        // value={checked.indexOf(value._id === -1)} 
                                                        />
                                                        {value.name}
                                                        <span class="form-check-sign">
                                                            <span class="check"></span>
                                                        </span>
                                                    </label>
                                                </div>
                                            })}
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
                                            <RadioBox prices={prices} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-10">
                    <div class="row">
                        {filteredList.map((value, key) => {
                            return <div className="col-md-4 pb-5" key={key}><Card product={value} /></div>
                        })}
                    </div>
                    <hr />
                    {/* <div className="text-center" style={{ color: "#9c27b0" }}>
                        {loadMoreButton()}
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Shop
