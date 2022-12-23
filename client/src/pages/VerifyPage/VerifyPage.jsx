import React from 'react'
import axios from 'axios'
import { useRef } from 'react'
import { Button } from 'react-bootstrap'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'


//  Internall Import 
import style from './Verifypage.module.scss'
import { CreateAlert } from '../../helper/alertMsg'


const VerifyPage = () => {
  let email = Cookies.get('register_token') ? Cookies.get('register_token') : '' 
  const navigate = useNavigate()
  let otp = useRef()
  //  Verifying Otp 
  const submitOtp = async () => {
     try {

      await axios({
        method: 'POST',
        url:'/api/v1/users/activation/otp-code',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
           otp:otp.value
        }

     }).then( res => {
       if (res.status === 200 ) {
           CreateAlert('success', 'User Verifiyed Successfully')
           Cookies.remove('register_token')
           navigate('/login') 
       } 
     }).catch (err => {
       CreateAlert('error', err.response.data.message)
    })
    } catch (error) {
        CreateAlert('error', 'Something went wrong!')
     }
  }


  return (
    <div className={style.otppage}>
       <div className={style.otpbox}>
        <h4>Verify with OTP code.</h4>
         <input ref={input => otp = input } placeholder='Enter Otp here.' type="text" />
         <p>Otp Code sent to {email}</p>
         <p>Didn't Get Code, <Button>resend.</Button></p>
         <Button onClick={submitOtp}>Verify</Button>
       </div>
  
    </div>
  )
}

export default VerifyPage