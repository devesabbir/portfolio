import SkillModel from './../../models/SkillModel.js';

/**
 * Create skill
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const CreateSkill = async (req, res, next) => {

    const {
        email
    } = req ?.login

    try {
        const newSkill = await SkillModel.create({
            userEmail: email,
            ...req.body
        })
        res.status(200).json({
            message: 'Skill Create',
            data: newSkill
        })
    } catch (error) {
        next(error)
    }
}



export const GetSkills = async (req, res, next) => {

    try {
        const allSkills = await SkillModel.find()
        res.status(200).json({
            message: 'All Skills',
            data: allSkills
        })
    } catch (error) {
        next(error)
    }
}