import { Request, Response, NextFunction, Router } from 'express'
import * as profileController from '../../controllers/v1/profile.controller';
import { googleIdTokenVerify } from '../../middlewares/Google';

// 21/04/13 profile 라우터 생성 by 현빈 - 1번째 라우팅 만들어주기
const profileRouter = Router();
// Read profile
profileRouter.get('/profile/', googleIdTokenVerify, profileController.getProfile);


// Update One
profileRouter.put('/profile/:id', googleIdTokenVerify, profileController.updateProfile)



export default profileRouter;