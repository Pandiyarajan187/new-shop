import React,{ useState, useEffect, Fragment , useContext } from 'react'
import { request } from '../utils/Request'
// import { MDBInput } from 'mdbreact'
import qs from 'query-string'
import Card from "../core/Card";
import authContext from '../context/authContext';
const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: 'All',
        search: '',
        results: [],
        searched: false
    })
 const {getBuyerCategory , categories, searchSubmit, submitSearch  } = useContext(authContext)
    const { category, search, results, searched } = data

    // const getAllCategories = async() => {
    //     try {
    //         const res = await request('get', '/categories/read')
    //         if (res) {
    //             setData({ ...data, categories: res.data })
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    useEffect(() => {
        getBuyerCategory()
        // eslint-disable-next-line
    }, [])

    useEffect(()=> {
        setData({ ...data, results: submitSearch , searched : true})
        // console.log(submitSearch);
    },[submitSearch]) 
  
    const submit = (e) => {
        e.preventDefault()
            const query = qs.stringify({ search: search || undefined, category })
            // setData({ ...data, results: res.data, searched: true })
            // console.log(query);
        searchSubmit(query)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value, searched: false })
    }

    const searchMessage = (searched, results) => {
        if (searched && results.length > 0) {
            return `Found ${results.length} Products`
        }
        if (searched  && results.length < 1) {
            return `No Products Found!`
        }
    }

    const searchedProducts = (results = [] ) => {
        return <div>
            <h2 >{searchMessage(searched, results)}</h2>
            <div className="row">
                { results.map((value, key) => <div className="col-md-3"><Card key={key} product={value}/></div>) }
            </div>
        </div>
    }
    const searchForm = (
        <Fragment>
            <div class="row">
                <div class="col-md-4">
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Pick Category</label>
                        <select class="form-control " data-style="btn btn-link" id="exampleFormControlSelect1" name="category" onChange={handleChange}>
                            <option value="">All</option>
                            {categories.map((value, key) => <option key={key} value={value._id}>{value.name}</option>)}
                        </select>
                    </div>
                </div>
                <div class="col-md-6">
                    <form class="form-inline" onSubmit={submit}>
                        <div class="form-group ">
                            <input type="text" class="form-control" placeholder="Search" onChange={handleChange}/>
                        </div>
                        <button type="submit" class="btn btn-white btn-raised btn-fab btn-round">
                            <i class="material-icons">search</i>
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    )

    return (
        <div>
            {searchForm}
            {searchedProducts(results)}
        </div>
    )
}

export default Search
