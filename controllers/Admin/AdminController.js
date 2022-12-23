import UserModel from './../../models/UserModel.js';
import CreateError from './../../utility/CreateError.js';


/**
 * User Account Status Modifying
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const UserAccountStatus = async (req, res, next) => {
    const {
        id
    } = req.params
    const {
        accountStatus
    } = req.body

    try {
        const userAccount = await UserModel.find({
            $and: [{
                _id: id
            }, {
                role: "user"
            }]
        })

        if (!userAccount.length > 0) {
            next(CreateError(404, 'User Not Found.'))
        }

        if (userAccount.length > 0) {


            // is verified 
            let isVerified = await UserModel.findById(id)

            if (!isVerified.isVerify) {
                next(CreateError(401, 'Not verified user'))
            }

            if (isVerified.isVerify) {

                const updateStatus = await UserModel.findByIdAndUpdate(id, {
                    accountStatus: accountStatus.toUpperCase()
                }, {
                    upsert: true
                })
    
                res.status(200).json({
                    message: "User Updated successfully.",
                    user: updateStatus
                })
               
            }     

        }

    } catch (error) {
        next(error)
    }
}