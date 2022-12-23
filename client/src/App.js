import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

//  Internal Import
import Layout from "./components/Layout/Layout";
import { USER_LOGIN } from "./redux/userAuth/actionTypes";
import AppRoutes from "./routes/AppRoutes";

function App() {

    const dispatch = useDispatch()
    const access_token = Cookies.get('access_token') ? Cookies.get('access_token') : null

    useEffect(() => {
       const logInCheck = async () => {
          try {
              await axios({
                   method: 'GET',
                   url: 'api/v1/users/login/me',
                   headers: {
                     'authorization': 'Bearer ' + access_token
                    }
                }).then( res => {
                   dispatch({type:USER_LOGIN, payload: res.data.data})
                })
             } catch (error) {
               
             }
       }

       logInCheck()
       
    },[access_token,dispatch])


    return(
        <Layout>
             <AppRoutes/>
        </Layout> 
     ) 

}

export default App;

