import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
   const isRegister  =  useSelector( state => state.user.isRegister) 
   return !isRegister ? <Navigate to={'/register'}/> : <Outlet/>
}


export default ProtectedRoute