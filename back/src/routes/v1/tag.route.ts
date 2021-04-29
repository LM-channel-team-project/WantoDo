import { Router } from 'express';

// 라우터 토대 생성 21/4/29 by 현빈
const tagRouter = Router();
// tag 생성
tagRouter.post('/')
// tag 읽기
tagRouter.get('/')
// tag 수정
tagRouter.patch('/')
// tag 삭제
tagRouter.delete('/')

export default tagRouter;