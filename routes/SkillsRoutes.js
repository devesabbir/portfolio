import express from 'express'
import {
    AdminAuthCheck,
    AuthCheck
} from '../middleware/AuthCheck.js'
import {
    CreateSkill,
    GetSkills
} from './../controllers/skill/SkillController.js';
const SkillRoute = express.Router()


SkillRoute.route('/').get(GetSkills)
SkillRoute.route('/create').post(AuthCheck, AdminAuthCheck, CreateSkill)


export default SkillRoute