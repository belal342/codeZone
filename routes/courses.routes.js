
const express=require('express')
const router=express.Router()
const verifyToken=require('../middleware/verifyToken')
const {body}=require('express-validator')
const courseController=require('../controllers/courses.controllers')
const userRoles = require('../utils/userRoles')
const allowedTo=require('../middleware/allowedTo')


router.get('/',courseController.getAllCourse)

router.get('/:courseId',courseController.getCourse)

router.post('/',verifyToken,[body('title').notEmpty().isLength({min:2}).withMessage("title is required")],courseController.addCourse)


router.patch('/:courseId',courseController.updateCourse)

router.delete('/:courseId',verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANAGER),courseController.deleteCourse)

module.exports=router