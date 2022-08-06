import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import MyRoute from './MyRoute';
import { useNavigate } from 'react-router-dom';


const App = () => {
  let navigate = useNavigate()
  return(
    <div className='container'>
       <MyRoute />
    </div>
  )
}

export default App;






//https://sk-test-ecommerce.herokuapp.com