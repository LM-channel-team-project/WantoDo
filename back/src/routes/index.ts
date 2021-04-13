import {Request, Response, NextFunction , Router} from 'express';

import V1AccountRouter from './v1/account.route'

const router = Router();

router.use('/v1/accounts', V1AccountRouter);

export default router;