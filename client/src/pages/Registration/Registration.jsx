//  External Import
import React from 'react'
import { useDispatch } from 'react-redux'
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';


// Internal Import 
import style from './Registration.module.scss'
import { signUpSchema } from '../../helper/formValidator';
import { UserRegistration } from '../../redux/userAuth/actions';



const Registration = () => {

   const dispatch = useDispatch()
   const navigate = useNavigate()
   
   const formik = useFormik({
      initialValues: {
           name:'',
           phone:'',
           email:'',
           password:'',
           c_password:'',
        },
        validationSchema: signUpSchema,
        onSubmit : (values, { resetForm }) => {
           let formData = new FormData()
           formData.append('name', values.name)
           formData.append('phone', values.phone)
           formData.append('email', values.email)
           formData.append('password', values.password)
           
           dispatch(UserRegistration(formData, resetForm, navigate))
        }
    })
  
  
  return (
    <div className={style.registraion}>
        <div className={style.wrapper}>
            <h2>User Registration</h2>
          <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                   style={formik.errors.name && formik.touched.name ? {border: '1px solid red'} : {}}
                   name="name"
                   onChange={formik.handleChange}  
                   type="text" 
                   value={formik.values.name}
                   placeholder="Enter Name" />

                   {
                    formik.errors.name && formik.touched.name ? (<p style={{color:'red', marginLeft:'5px'}}> {formik.errors.name} </p>) : null
                   }   
               </Form.Group>

               <Form.Group className="mb-3" controlId="formPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                   style={formik.errors.phone && formik.touched.phone ? {border: '1px solid red'} : {}}
                   name='phone'  
                   onChange={formik.handleChange} 
                   value={formik.values.phone}
                   type="text" 
                   placeholder="Enter Phone" />
                   {
                    formik.errors.phone && formik.touched.phone ? (<p style={{color:'red', marginLeft:'5px'}}> {formik.errors.phone} </p>) : null
                   }   
               </Form.Group>

               <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                  style={formik.errors.email && formik.touched.email ? {border: '1px solid red'} : {}}
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  type="email" 
                  placeholder="Enter email"
                   />

                  {
                    formik.errors.email && formik.touched.email ? (<p style={{color:'red', marginLeft:'5px'}}> {formik.errors.email} </p>) : null
                   }   
               </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                   <Form.Label>Password</Form.Label>
                   <Form.Control
                    style={formik.errors.password && formik.touched.password ? {border: '1px solid red'} : {}}
                    name='password'
                    onChange={formik.handleChange}
                    value={formik.values.password} 
                    type="password"
                    placeholder="Password"
                      />
                    {
                    formik.errors.password && formik.touched.password ? (<p style={{color:'red', marginLeft:'5px'}}> {formik.errors.password} </p>) : null
                   }     
              </Form.Group>

              <Form.Group className="mb-3" controlId="formConfirmPassword">
                   <Form.Label>Confirm Password</Form.Label>
                   <Form.Control
                    style={formik.errors.c_password && formik.touched.c_password ? {border: '1px solid red'} : {}}
                    name='c_password'
                    onChange={formik.handleChange}    
                    type="password"
                    value={formik.values.c_password}
                    placeholder="Confirm password" 
                   />

                   {
                    formik.errors.c_password && formik.touched.c_password ? (<p style={{color:'red', marginLeft:'5px'}}> {formik.errors.c_password} </p>) : null
                   }   
              </Form.Group>
  
            <Button className='w-100' variant="primary" type="submit">
                 Register
            </Button>
             </Form>
             <div className={style.form_footer}>
                 <Link to={'/login'}>Login</Link>
             </div>
        </div>
    </div>
  )
}

export default Registration