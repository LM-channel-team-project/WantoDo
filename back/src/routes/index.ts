import { Request, Response, NextFunction, Router } from 'express';

import V1AccountRouter from './v1/account.route'
import V1ProfileRouter from './v1/profile.route'
import { googleIdTokenVerify } from "../middlewares/Google";

const router = Router();

router.use('/v1/accounts', googleIdTokenVerify, V1AccountRouter);
router.use('/v1/profiles', googleIdTokenVerify, V1ProfileRouter);




export default router;

// apidoc 공통 부분 정의

/**
 * @apiDefine HeaderToken
 * @apiHeader {JWT} Authorization OAuth Token (Google: IdToken)
 */