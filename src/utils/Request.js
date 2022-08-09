import axios from 'axios'
import { isAuthenticated } from '../utils/Auth'

export const request = async( method, url, data = {}, id = false, userToken = false, queryString = '' ) => {
   const { user , token } = isAuthenticated()
   let BASE_URL = 'https://sk-test-ecommerce.herokuapp.com/api'
   let headers = {}
   let urlId = ''
   if(userToken){
       headers = {
           'Authorization' : `Bearer ${token}`
       }
   }
   if(id){
       urlId = url + user._id
   }else{
       urlId = url
   }
   if(queryString !== ''){
       urlId = urlId + queryString
   }
   try {
       const res = await axios({ method, url : BASE_URL + urlId, data, headers})
       if(res){
           return res
       }
   } catch (error) {
    if(error){
        return error
    }
   }
}
