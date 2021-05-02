import { Router } from 'express';

import V1AccountRouter from './v1/account.route';
import V1ProfileRouter from './v1/profile.route';
import V1TaskRouter from './v1/task.route';
import V1TagRouter from './v1/tag.route';
import googleIdTokenVerify from '../middlewares/Google';

const router = Router();

router.use('/v1/accounts', googleIdTokenVerify, V1AccountRouter);
router.use('/v1/profiles', googleIdTokenVerify, V1ProfileRouter);
router.use('/v1/tasks', googleIdTokenVerify, V1TaskRouter);
router.use('/v1/tags', googleIdTokenVerify, V1TagRouter);

export default router;

// apidoc 공통 부분 정의

/**
 * @apiDefine HeaderToken
 * @apiHeader {JWT} Authorization OAuth 2.0 Token (Google: IdToken)
 */
