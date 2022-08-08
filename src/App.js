import React , {useContext} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import MyRoute from './MyRoute';
import { useNavigate } from 'react-router-dom';
import AuthState from './context/authState'


const App = () => {
  return(
      <AuthState>
         <MyRoute />
      </AuthState>
  )
}

export default App;
