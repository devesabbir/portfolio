import express from 'express'
import {
     UserAccountStatus
} from '../controllers/Admin/AdminController.js';
import {
     GetSingleUsers,
     UserRegistration
} from '../controllers/User/UserController.js'
import {
     AdminAuthCheck,
     AuthCheck
} from './../middleware/AuthCheck.js';
const AdminRoute = express.Router()

// add new user
AdminRoute.route('/add-user').post(AuthCheck, AdminAuthCheck, UserRegistration)

// get single user
AdminRoute.route('/user/:id').get(AuthCheck, AdminAuthCheck, GetSingleUsers)

// User AccountStatus modify
AdminRoute.route('/user/:id').put(AuthCheck, AdminAuthCheck, UserAccountStatus)


export default AdminRoute