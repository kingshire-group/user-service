import { Router } from 'express';
import { UserComponent } from '../components';

const router: Router = Router();

router.get('/', UserComponent.findAll);
router.post('/', UserComponent.create);
router.get('/:id', UserComponent.findOne);
router.delete('/:id', UserComponent.remove);

export default router;
