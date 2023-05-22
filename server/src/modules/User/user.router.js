import {Router} from 'express'
import userAuth from '../../middleware/auth.js';
import validation from '../../middleware/validation.js';
import { fileUpload } from '../../utils/fileUpload.js';
import * as userController from './user.controller.js';
import * as userValidation from './user.validation.js';

const router = Router();



router.post('/signup',validation(userValidation.signUpSchema),userController.signUp)
router.post("/signin" , validation(userValidation.signInSchema), userController.signIn)
router.post("/profilePic",userAuth,fileUpload("path"),userController.updateUserProfile)
router.get('/',userAuth, userController.getUserData)
router.get('/:userId', userController.getUserDataById)
router.put('/',validation(userValidation.updateUserSchema),userAuth, userController.updateUser)
router.put('/changePassword',userAuth,validation(userValidation.changePasswordSchema),userController.changePassword)
router.delete('/',userAuth, userController.deleteUser)
router.get('/verify/:token' , userController.verifyUser)
export default router;