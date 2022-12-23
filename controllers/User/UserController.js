import CreateError from '../../utility/CreateError.js';
import UserModel from '../../models/UserModel.js';
import {
    isEmail
} from '../../utility/Validator.js';
import {
    PasswordEncode
} from '../../utility/PasswordHandle.js';
import {
    SendMail
} from '../../utility/SendMail.js';
import {
    CreateToken,
    VerifyToken
} from '../../utility/Token.js';
import {
    RandomDigit
} from '../../utility/RandomDigit.js';


/**
 * User Registration 
 * @access public
 * @route  api/v1/users/register
 * @method post
 */

export const UserRegistration = async (req, res, next) => {
    const {
        name,
        phone,
        email,
        password
    } = req.body;

    try {

        if (!name || !phone || !email) {
            next(CreateError(400, 'Few Field are required!'))
        } else {

            if (!isEmail(email)) {
                next(CreateError(400, 'Invalid email'))
            }

            if (isEmail(email)) {

                let existUser = await UserModel.findOne({
                    email: {
                        $eq: email
                    }
                })

                if (existUser) {
                    next(CreateError(400, 'User Already Registered!'))
                }

                if (!existUser) {

                    let activationCode = RandomDigit(6)


                    //First User will be Admin        
                    let isFirstUser = await UserModel.find()

                    if (!isFirstUser.length > 0) {
                        const newUser = await UserModel.create({
                            ...req.body,
                            password: PasswordEncode(password),
                            otp: activationCode,
                            role: 'admin',
                        })

                        let activationToken = CreateToken({
                            email: email
                        }, '7d')

                        let msg = {
                            subject: 'Verify Your Account',
                            userName: newUser.name,
                            link: process.env.APP_URL + 'users/activation/' + activationToken,
                            code: activationCode
                        }

                        SendMail(newUser.email, msg)

                        res.status(200).cookie('register_token', email, {
                                expiresIn: Date.now() + 1000 * 60
                            })
                            .json({
                                message: 'New User Registered!',
                                user: newUser
                            })
                    }


                    if (isFirstUser.length > 0) {

                        const newUser = await UserModel.create({
                            ...req.body,
                            password: PasswordEncode(password),
                            otp: activationCode

                        })

                        let activationToken = CreateToken({
                            email: email
                        }, '7d')

                        let msg = {
                            subject: 'Verify Your Account',
                            userName: newUser.name,
                            link: process.env.APP_URL + 'users/activation/' + activationToken,
                            code: activationCode
                        }

                        SendMail(newUser.email, msg)

                        res.status(200).cookie('register_token', email, {
                                expiresIn: Date.now() + 1000 * 60
                            })
                            .json({
                                message: 'New User Registered!',
                                user: newUser
                            })
                    }

                }

            }

        }

    } catch (error) {
        next(error)
    }
}


export const UserUpdate = async (req, res, next) => {

    const {
        id
    } = req.login

    try {
        if (id !== req.params.id) {
            next(400, 'Bad Request!')
        }

        if (id == req.params.id) {
            console.log('Okay');
        }

    } catch (error) {
        next(error)
    }
}



/**
 * Delete User 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

export const DeleteUser = async (req, res, next) => {

    const {
        id
    } = req.params

    try {
        const isUserExist = await UserModel.find({
            $and: [{
                    _id: id
                },
                {
                    role: {
                        $eq: 'User'
                    }
                }
            ]
        })

        if (!isUserExist.length > 0) {
            next(CreateError(404, 'Sorry! User Not Found!'))
        }

        if (isUserExist.length > 0) {
            const deletedUser = await UserModel.findByIdAndDelete(id)

            res.status(200).json({
                message: 'Deleted!',
                user: deletedUser
            })
        }

    } catch (error) {
        next(error)
    }
}




/**
 * Get All Users
 * @access private 
 * @route api/v1/users
 * @method get
 */
export const GetAllUsers = async (req, res, next) => {

    try {
        const users = await UserModel.find({
            role: {
                $not: {
                    $eq: "Admin"
                }
            }
        })
        res.status(200).json({
            message: 'All Users',
            data: users
        })

    } catch (error) {
        next(error)
    }

}


/**
 * Get All Users
 * @access private 
 * @route api/v1/users
 * @method get
 */
export const GetSingleUsers = async (req, res, next) => {

    const {
        id
    } = req.params

    try {
        const user = await UserModel.findById(id)

        if (!user) {
            next(CreateError(404, 'User not found.'))
        }

        if (user) {
            res.status(200).json({
                message: 'Single User',
                data: user
            })

        }

    } catch (error) {
        next(error)
    }

}

/**
 * Keep LoggedIn User
 * @access private 
 * @route api/v1/users/login/me
 * @method get
 */
export const LoggedInUser = async (req, res, next) => {
    let authToken = req.headers?.authorization
    try {

        if (!authToken) {
            next(CreateError(400, 'Authorization token missing.'));
        }

        if (authToken) {
            let token = authToken.split(' ')[1]
            let loginUser = VerifyToken(token)

            let findLoginUser = await UserModel.findById({
                _id: loginUser.id
            })
            
            res.status(200).json({
                message: 'Login User',
                data: findLoginUser
            })

        }

    } catch (error) {
        next(error)
    }

}


/**
 * Activate Account With JWT
 * @access public
 * @route api/v1/users/activation/:token
 * @method get
 */
export const ActivateAccount = async (req, res, next) => {

    const {
        token
    } = req.params

    try {

        if (VerifyToken(token)) {

            let verifiedUser = VerifyToken(token)

            let findUser = await UserModel.findOne({
                email: {
                    $eq: verifiedUser.email
                }
            })

            if (findUser.isVerify) {
                next(CreateError(400, 'Already Verified!'))
            }

            if (!findUser.isVerify) {

                //  First User Will be Automatic Active
                let isFirstUser = await UserModel.find()

                if (!(isFirstUser.length > 1)) {

                    let updateUser = await UserModel.findOneAndUpdate({
                        email: verifiedUser.email
                    }, {
                        isVerify: true,
                        otp: '',
                        accountStatus: "ACTIVE"
                    }, {
                        upsert: true
                    })

                    res.status(200).json({
                        message: 'Verified!',
                        user: updateUser
                    })

                }

                if (isFirstUser.length > 1) {

                    let updateUser = await UserModel.findOneAndUpdate({
                        email: verifiedUser.email
                    }, {
                        isVerify: true,
                        otp: ''
                    }, {
                        upsert: true
                    })

                    res.status(200).json({
                        message: 'Verified!',
                        user: updateUser
                    })

                }

            }

        }

    } catch (error) {
        next(error)
    }
}


/**
 * Activate Account with OTP
 * @access public
 * @route api/v1/users/activation/otp-code
 * @method post
 */
export const ActivateAccountOtp = async (req, res, next) => {

    const {
        otp
    } = req.body

    try {

        if (!otp) {
            next(CreateError(400, 'You have must be Provide OTP code!'))
        }
        const existUser = await UserModel.find({
            $and: [{
                otp: otp
            }, {
                isVerify: false
            }]
        })

        if (!existUser.length > 0) {
            next(CreateError(400, 'Invalid otp code'))
        }

        if (existUser.length > 0) {


            // First user will be active automatically           
            let isFirstUser = await UserModel.find()

            if (!(isFirstUser.length > 1)) {
                const updateUser = await UserModel.findOneAndUpdate({
                    otp: otp
                }, {
                    isVerify: true,
                    otp: '',
                    accountStatus: "ACTIVE"
                }, {
                    upsert: true
                })

                res.status(200).json({
                    message: 'Verified!',
                    user: updateUser
                })

            }

            if (isFirstUser.length > 1) {

                const updateUser = await UserModel.findOneAndUpdate({
                    otp: otp
                }, {
                    isVerify: true,
                    otp: ''
                }, {
                    upsert: true
                })

                res.status(200).json({
                    message: 'Verified!',
                    user: updateUser
                })

            }

        }

    } catch (error) {
        next(error)
    }
}



/**
 * Activate Account with OTP
 * @access public
 * @route api/v1/users/activation/otp-code/resend
 * @method get
 */

export const ActivateAccountOtpResend = async (req, res, next) => {

    const {
        email
    } = req.body


    try {

        if (!email) {
            next(CreateError(400, 'You have must be Provide OTP code!'))
        }
        const existUser = await UserModel.find({
            $and: [{
                email: email
            }, {
                isVerify: false
            }]
        })

        if (!existUser.length > 0) {
            next(CreateError(400, 'User Not Found!'))
        }

        if (existUser.length > 0) {

            let newOtp = RandomDigit(6)

            let newOtpUpdate = await UserModel.findOneAndUpdate({
                email: email
            }, {
                $set: {
                    otp: newOtp
                }
            })

            let activationToken = CreateToken({
                email: email
            }, '7d')

            let msg = {
                subject: 'Verify Your Account',
                userName: newOtpUpdate.email,
                link: process.env.APP_URL + 'users/activation/' + activationToken,
                code: newOtp
            }

            SendMail(newOtpUpdate.email, msg)

            res.status(200).json({
                message: 'New Otp has been updated successfully',
                data: newOtpUpdate
            })

        }

    } catch (error) {
        next(error)
    }
}