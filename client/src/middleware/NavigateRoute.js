import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
   const isLogin  =  useSelector( state => state.user.isLogin) 
   return isLogin ? <Navigate to={'/'}/> : <Outlet/>
   
}


export default PrivateRoute