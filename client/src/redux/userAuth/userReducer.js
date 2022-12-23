import {
    USER_LOGIN,
    USER_LOGOUT,
    USER_REGISTER
} from './actionTypes';
import Cookies from 'js-cookie'

const initialState = {
    isLoading: false,
    user: {},
    isLogin:false,
    message:'',
    isRegister: Cookies.get('register_token') ? Cookies.get('register_token') : '',
};

export const userReducer = (state = initialState, {
    type,
    payload
}) => {
    switch (type) {
        case USER_REGISTER:
            return {
                  ...state,
                isRegister: Cookies.get('register_token') ? Cookies.get('register_token') : '',
                message:'User Registration Successfull.'
            }

       case USER_LOGIN:  
           return {
              ...state,
              isLogin: true,
              user:payload
           }   
        
       case USER_LOGOUT:  
           return {
              ...state,
              isLogin: false,
              user:{}
           }  

            default:
                return state;
    }
}