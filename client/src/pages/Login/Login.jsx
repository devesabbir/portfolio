// Externall Import
import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useDispatch } from 'react-redux';

// Internal Import
import style from './Login.module.scss'
import { UserLoginAction } from '../../redux/userAuth/actions';


const Login = () => {
  const dispatch = useDispatch()
  const [active, setActive] = useState(true)

  const [input, setInput] = useState({
     email:'',
     password:'',
  })
  
  //  Handle Input 
  const handleInput = (e) => {

     let target = e.target
     setInput((prev) => ({
        ...prev,
        [target.name]: target.value
     }))

     if (!input.email || !input.password) {    
        setActive(true)
      } else {
        setActive(false)
      }
         
  }
  

  // Handle Login 
  const handleLogin = (e) => {
      e.preventDefault()

      let formData = new FormData()
      formData.append('email', input.email)
      formData.append('password', input.password)
      
      dispatch(UserLoginAction(formData))
  }

  return (
    <div className={style.loginpage} >
        <div className={style.login_wrapper}> 
            <div className={style.login_left} >
             <Form onSubmit={handleLogin}>
               <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                   type="email"
                   name='email'
                   value={input.email}
                   placeholder="Enter email" 
                   onChange={handleInput}
                   />
               </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                   <Form.Label>Password</Form.Label>
                   <Form.Control 
                    type="password" 
                    name='password'
                    value={input.password}
                    placeholder="Password" 
                    onChange={handleInput}
                    />
              </Form.Group>
  
            <Button disabled={active} className='w-100' variant="primary" type="submit">
                 Login
            </Button>
             </Form>
             </div> 
             <div className={style.login_right}>
                  <h3>Sign Up</h3>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi sint accusamus eum eos, cumque qui laborum ipsa nobis.</p>

                 <Link to={'/register'}>Register Now!</Link>
             </div>
        </div>
    </div>
  )
}

export default Login