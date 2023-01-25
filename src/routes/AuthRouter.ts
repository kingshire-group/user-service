import { Router } from 'express';
import { AuthComponent } from '../components';

const router: Router = Router();

router.post('/signup', AuthComponent.signup);
router.post('/login', AuthComponent.login);
router.post('/logout', AuthComponent.login);
router.post('/forgot-password', AuthComponent.login);
router.post('/reset-password', AuthComponent.login);
router.post('/refresh-token', AuthComponent.login);
router.post('/google', AuthComponent.login);

export default router;
