import express from 'express';
import {
    LoginController
} from '../controllers/Login/LoginController.js';
import {
    ActivateAccount,
    ActivateAccountOtp,
    ActivateAccountOtpResend,
    DeleteUser,
    GetAllUsers,
    LoggedInUser,
    UserRegistration,
    UserUpdate
} from '../controllers/User/UserController.js';
import { AdminAuthCheck, AuthCheck } from '../middleware/AuthCheck.js';
const UserRoute = express.Router();

UserRoute.route('/login/me').get(LoggedInUser)
UserRoute.route('/').get(AuthCheck, AdminAuthCheck, GetAllUsers)

UserRoute.route('/login').post(LoginController)
UserRoute.route('/registration').post(UserRegistration)
UserRoute.route('/activation/:token').get(ActivateAccount)
UserRoute.route('/activation/otp-code').post(ActivateAccountOtp)
UserRoute.route('/activation/otp-code/resend').get(ActivateAccountOtpResend)

UserRoute.route('/:id').delete(AuthCheck, AdminAuthCheck, DeleteUser)
UserRoute.route('/:id').patch(AuthCheck, UserUpdate)



export default UserRoute;