import { Router } from 'express';
import { AuthComponent } from '../components';

const router: Router = Router();

router.post('/signup', AuthComponent.signup);
router.post('/login', AuthComponent.login);

export default router;
