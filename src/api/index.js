import express from 'express';
import * as postCtrl from './post/postCtrl';

const router = express.Router();

router.post('/', postCtrl.Create);
router.get('/', postCtrl.readList);
router.get('/:projectId', postCtrl.read);
router.patch('/:projectId', postCtrl.update);
router.delete('/:projectId', postCtrl.remove);

export default router;
