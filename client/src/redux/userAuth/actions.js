import {
  CreateAlert
} from './../../helper/alertMsg';
import axios from 'axios'
import {
  USER_LOGIN,
  USER_REGISTER
} from './actionTypes';

// user registration actions
export const UserRegistration = (data, resetForm, navigate) => async (dispatch) => {
  try {
    await axios({
      method: 'POST',
      url: 'api/v1/users/registration',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }).then(res => {

      if (res.status === 200) {
        dispatch({
          type: USER_REGISTER
        })
        CreateAlert('success', 'User Registration Successfull.');
        resetForm()
        navigate('/register/verify')
      }
    })
  } catch (error) {
    CreateAlert('error', error.response.data.message);
  }
}


//  Login Action 
export const UserLoginAction = (data) => async (dispatch) => {
  try {
    await axios({
      method: 'POST',
      url: 'api/v1/users/login',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
        },
      data: data
   }).then( res => {
      dispatch({type:USER_LOGIN, payload:res.data.loginUser})
      CreateAlert('success', res.data.message)
   })

  } catch (err) {
    CreateAlert('error', err.response.data.message)
  }
}