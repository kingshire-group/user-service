import { Router } from 'express';
import { LoginComponent, SignupComponent } from '../components';
import { authLocal } from '../components/Auth/login/login.controller';


const router: Router = Router();

router.post('/signup/email', SignupComponent.profile)
router.post('/signup/username', SignupComponent.createUsername)
router.post('/login', authLocal, LoginComponent.login)
/*router.post('/logout', AuthComponent.login)
router.post('/forgot-password', AuthComponent.login)
router.post('/reset-password', AuthComponent.login)
router.post('/refresh-token', AuthComponent.login)
router.post('/google', AuthComponent.login)
 */
export default router;
