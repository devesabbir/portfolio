// Externall Import
import {
    useRoutes
} from 'react-router-dom';

// Internall Import
import PrivateRoute from '../middleware/PrivateRoute';
import NavigateRoute from '../middleware/NavigateRoute';
import Registration from '../pages/Registration/Registration';
import Login from './../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import VerifyPage from '../pages/VerifyPage/VerifyPage';
import ProtectedRoute from '../middleware/ProtectedRoute';
import AddForm from '../components/AddForm/AddForm';

const AppRoutes = () => {

    const routes = useRoutes([
        {
            path: '/',
            element: <PrivateRoute/> ,
            children: [{
                    path: '/',
                    element: <Dashboard/>
                },

                {
                    path: 'user/all-users',
                    element: 'Users'
                },

                {
                    path: 'skill/all-skills',
                    element: 'Skills'
                }, 
                {
                    path: 'skill/add-new-skill',
                    element: <AddForm/>
                },

                {
                    path: 'portfolio/all-portfolios',
                    element: 'Portfolios'
                }

            ]
        },
        {
            path: '/',
            element: <NavigateRoute/> ,
            children: [{
                    path: '/login',
                    element: <Login/>
                },
                {
                    path: '/register',
                    element: <Registration/>,
                },
               
            ]
        },

        {
            path:'/register/verify',
            element: <ProtectedRoute/>,
            children : [
                {
                    path: '/register/verify',
                    element: <VerifyPage/>
                }
            ]
        },

        {
            path:'*',
            element:<h2>404 Not Found!</h2>,
        }
    ])

    return routes

}


export default AppRoutes;