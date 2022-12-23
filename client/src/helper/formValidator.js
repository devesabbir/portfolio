import * as yup from "yup";

export const signUpSchema = yup.object({
    name: yup.string().min(2).max(25).required('Please Enter Your Name.'),
    phone: yup.string().min(11).max(13).required('Please Enter Your Phone.'),
    email:yup.string().email().required('Please Enter Your Email.'),
    password:yup.string().min(6).required('Password field is Required!.'),
    c_password:yup.string().required().oneOf([yup.ref('password'), null], 'Password didn\'t match!')
})
