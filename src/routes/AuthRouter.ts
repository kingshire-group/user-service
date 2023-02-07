import { Router } from 'express';
import { LoginComponent, SignupComponent } from '../components';
import { authLocal, login } from '../components/Auth/login/login.controller';
import { createUsername, createUserProfile } from '../components/Auth/signup/signup.controller';


const router: Router = Router();

router.post('/signup/email', createUserProfile)
router.post('/signup/username', createUsername)
router.post('/login', authLocal, login)
/*router.post('/logout', AuthComponent.login)
router.post('/forgot-password', AuthComponent.login)
router.post('/reset-password', AuthComponent.login)
router.post('/refresh-token', AuthComponent.login)
router.post('/google', AuthComponent.login)
 */
export default router;
