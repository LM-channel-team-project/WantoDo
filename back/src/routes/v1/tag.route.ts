import { Router } from 'express';

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