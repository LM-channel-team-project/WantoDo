import {Request, Response, NextFunction, Router} from 'express';

import * as accountController from '../../controllers/v1/account.controller';
import {googleIdTokenVerify} from '../../middlewares/Google';

const accountRouter = Router();

accountRouter.post('/login', accountController.loginUser);

accountRouter.patch('/settings', accountController.updateUserSettings)

export default accountRouter;