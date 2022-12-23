import express from 'express'
import UserRoute from './UserRoutes.js';
import SkillRoute from './SkillsRoutes.js';
import AdminRoute from './AdminRoutes.js';
const routes = express.Router()



// User routes
routes.use('/admin', AdminRoute )
// User routes
routes.use('/users', UserRoute )
// Skill routes
routes.use('/skills', SkillRoute )


export default routes
