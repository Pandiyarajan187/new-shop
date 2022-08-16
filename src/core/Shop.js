// import React, { useEffect } from 'react'
// import { useState } from 'react';
// import { request } from '../utils/Request';
// import CheckBox from './CheckBox';
// import RadioBox from './RadioBox';
// import { prices } from "../utils/FixedPrices";
// import Card from './Card';
// const Shop = () => {

//     const [categories, setCategories] = useState([])
//     // eslint-disable-next-line
//     const [limit, setLimit] = useState(6)
//     const [skip, setSkip] = useState(0)
//     const [size, setSize] = useState(0)
//     const [myFilters,setMyFilters] = useState({
//         filters: { category: [], price: [] }
//     })
//     const [filteredResults,setFilteredResults] = useState([])
//     const getAllCategories = async() => {
//         try {
//             const res = await request('get', '/categories/read')
//             if (res) {
//                 setCategories(res.data)
//             }
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     const loadFilterResults = async (newFilters) => {
//         try {
//             const data = {
//                 limit,
//                 skip,
//                 filters: newFilters
//             }
//             const res = await request('post', '/products/search', data)
//             if (res) {
//                 setFilteredResults(res.data.data)
//                 setSize(res.data.size)
//                 setSkip(0)
//             }
//         } catch (error) {
//             console.log(error)
//         }
//     }
//     const loadMore = async () => {
//         try {
//             let toSkip = skip + limit
//             const data = {
//                 limit,
//                 skip: toSkip,
//                 filters: myFilters.filters
//             }
//             const res = await request('post', '/products/search', data)
//             if (res) {
//                 setFilteredResults([...filteredResults, ...res.data.data])
//                 setSize(data.size)
//                 setSkip(toSkip)
//             }
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     useEffect(() => {
//         getAllCategories()
//         loadFilterResults(myFilters.filters)
//         // eslint-disable-next-line
//     },[])
//     const handleFilter = (filters, filterBy) => {
//         const newFilters = { ...myFilters }
//         newFilters.filters[filterBy] = filters
//         if(filterBy === 'price'){
//             let priceValues = handlePrice(filters)
//             newFilters.filters[filterBy] = priceValues
//         }
//         loadFilterResults(myFilters.filters)
//         setMyFilters(newFilters)
//     }
//     const loadMoreButton = () => {
//         return(
//             size > 0 && size >= limit && (
//                 <div class="col-md-3 ml-auto mr-auto">
//                     <button rel="tooltip" class="btn btn-danger btn-round" data-original-title="" title="" onClick={loadMore}>Load more...</button>
//                 </div>
//             )
//         )
//     }
//     const handlePrice = (value) => {
//         const data = prices
//         let array = []
//         for(let key in data) {
//             if(data[key]._id === parseInt(value))
//                 array = data[key].array
//         }
//         return array
//     }
    
//     return (
//         <div class="container">
//             <h2 class="section-title">Find what you need</h2>
//                 <div class="row">
//                     <div class="col-md-2">
//                         <div class="card card-refine card-plain card-rose">
//                             <div class="card-body">
//                             <h4 class="card-title">
//                                 Reset
//                                 <button class="btn btn-default btn-fab btn-fab-mini btn-link pull-right" rel="tooltip" title="" data-original-title="Reset Filter">
//                                     <i class="material-icons">cached</i>
//                                 </button>
//                             </h4>
//                             <div id="accordion" role="tablist">
//                                 <div class="card card-collapse">
//                                     <div class="card-header" role="tab" id="headingTwo">
//                                         <h5 class="mb-0">
//                                             <a class="collapsed" data-toggle="collapse" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
//                                                 Filter By Categories
//                                                 <i class="material-icons">keyboard_arrow_down</i>
//                                             </a>
//                                         </h5>
//                                     </div>
//                                     <div id="collapseTwo" class="collapse" role="tabpanel" aria-labelledby="headingTwo">
//                                         <div class="card-body">
//                                             <CheckBox categories={categories} handleFilter={filters => handleFilter(filters, 'category')}/>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div class="card card-collapse">
//                                     <div class="card-header" role="tab" id="headingThree">
//                                         <h5 class="mb-0">
//                                             <a class="collapsed" data-toggle="collapse" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
//                                                 Filter By Price Range
//                                             <i class="material-icons">keyboard_arrow_down</i>
//                                             </a>
//                                         </h5>
//                                     </div>
//                                     <div id="collapseThree" class="collapse show" role="tabpanel" aria-labelledby="headingThree">
//                                         <div class="card-body">
//                                             <RadioBox prices={prices} handleFilter={filters => handleFilter(filters, 'price')}/>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="col-md-10">
//                     <div class="row">
//                         {filteredResults.map((value, key) => {
//                             return <div  className="col-md-4 pb-5" key={key}><Card  product={value}/></div>
//                         })}
//                     </div>
//                     <hr />
//                     <div className="text-center">
//                         {loadMoreButton()}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Shop
