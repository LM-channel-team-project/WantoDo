import { Request, Response, NextFunction, Router } from 'express'
import * as profileController from '../../controllers/v1/profile.controller';


// 21/04/13 profile 라우터 생성 by 현빈 - 1번째 라우팅 만들어주기
// 21/4/16 라우터 수정 by 현빈
const profileRouter = Router();
// Read profile
profileRouter.get('/profile/', profileController.getProfile);


// Update One
profileRouter.put('/profile/:id', profileController.updateProfile)



export default profileRouter;