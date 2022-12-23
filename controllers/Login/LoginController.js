import CreateError from "../../utility/CreateError.js"
import {
    PasswordDecode
} from "../../utility/PasswordHandle.js";
import {
    CreateToken
} from "../../utility/Token.js";
import {
    isEmail
} from "../../utility/Validator.js"
import UserModel from './../../models/UserModel.js';
import cookie from 'cookie-parser'

/**
 * Get All Users
 * @access private 
 * @route api/v1/login
 * @method post
 */

export const LoginController = async (req, res, next) => {

    const {
        email,
        password
    } = req.body

    try {

        if (!email || !password) {
            next(CreateError(400, 'All Field are Required.'))
        }

        if (email && password) {

            if (!isEmail(email)) {
                next(CreateError(400, 'Invalid Email Address.'))
            }

            if (isEmail(email)) {
                let loginUser = await UserModel.findOne({
                    email: email
                })

                if (!loginUser) {
                    next(CreateError(400, 'User Not Found.'))
                }

                if (loginUser) {
                    let checkPassword = PasswordDecode(password, loginUser.password)

                    if (!checkPassword) {
                        next(CreateError(400, 'Incorrect Password!'))
                    }

                    if (checkPassword) {
                        let token = CreateToken({
                            id: loginUser._id,
                            email: loginUser.email
                        }, '100d')


                        res.status(200).cookie('access_token', token).json({
                            message: 'Login Success',
                            loginUser: loginUser,
                            access_token: token
                        })
                    }
                }
            }
        }

    } catch (error) {
        next(error)
    }
}