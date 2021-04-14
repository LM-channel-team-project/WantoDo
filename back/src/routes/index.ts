import {Request, Response, NextFunction , Router} from 'express';

import V1AccountRouter from './v1/account.route'
import { googleIdTokenVerify } from "../middlewares/Google";

const router = Router();

router.use('/v1/accounts', googleIdTokenVerify, V1AccountRouter);

export default router;