import React,{ useState, useEffect , useContext } from 'react'
import { request } from '../utils/Request'
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

    const { getBuyerCategory, categories} = useContext(authContext)
    const {  category, search, results, searched } = data

    useEffect(() => {
        getBuyerCategory()
        // eslint-disable-next-line
    }, [])

    const searchSubmit = async (e) => {
        e.preventDefault()
        try {
            const query = qs.stringify({ search: search || undefined, category })
            const res = await request('get', `/products/search?${query}`)
            setData({ ...data, results: res.data, searched: true })
            console.log(data);
            
        } catch (error) {
            console.log(error);
        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value, searched: false })
    }

    const searchMessage = (searched, results) => {
        if (searched && results.length > 0) {
            return `Found ${results.length} Products`
        }
        if (searched && results.length < 1) {
            return `No Products Found!`
        }
    }

    const searchedProducts = (results = []) => {
        return <div>
            <h2 >{searchMessage(searched, results)}</h2>
            <div className="row">
                { results.map((value, key) => <div className="col-md-3"><Card key={key} product={value}/></div>) }
            </div>
        </div>
    }
    const searchForm = (
        <>
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
                    <form class="form-inline" onSubmit={searchSubmit}>
                        <div class="form-group ">
                            <input type="text" class="form-control" placeholder="Search" onChange={handleChange}/>
                        </div>
                        <button type="submit" class="btn btn-primary btn-raised btn-fab btn-round">
                            <i class="material-icons">search</i>
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
//"btn btn-primary btn-block mb-4"
    return (
        <div>
            {searchForm}
            {searchedProducts(results)}
        </div>
    )
}

export default Search
