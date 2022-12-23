import {
    VerifyToken
} from '../utility/Token.js';
import CreateError from './../utility/CreateError.js';
import UserModel from './../models/UserModel.js';



/**
 * Login AuthCheck
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

export const AuthCheck = (req, res, next) => {

    let authToken = req.cookies?.access_token

    try {
        if (!authToken) {
            next(CreateError(400, 'You are not authorized user.'))
        }

        if (authToken) {
            let loginUser = VerifyToken(authToken)
            req.login = loginUser
            next()
        }
    } catch (error) {
        next(error)
    }

}

/**
 * Admin AuthCheckout
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const AdminAuthCheck = async (req, res, next) => {

    try {
        const isAdmin = await UserModel.aggregate([{
            $match: {
                $and: [{
                        email: req.login?.email
                    },
                    {
                        role: 'admin'
                    }
                ]
            }
        }])
   
        if (!isAdmin) {
            next(CreateError(404, 'User Not Admin'));
        }

        if (isAdmin) {
            req.role = isAdmin[0].role 
            next() 
        }

    } catch (error) {
        next(error)
    }

}

