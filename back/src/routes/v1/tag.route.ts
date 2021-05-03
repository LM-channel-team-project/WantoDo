import { Router } from 'express';
import tagController from '../../controllers/v1/tag.controller';

// 라우터 토대 생성 21/4/29 by 현빈
const tagRouter = Router();

/**
 * @author 강성모(castleMo)
 * @since 21/05/03
 */
/**
 * @api {post} /v1/tags tag 생성
 * @apiName createTag
 * @apiGroup Tags
 * @apiVersion 1.0.0
 *
 * @apiUse HeaderToken
 *
 * @apiParam (Body) {String} name 태그 이름
 * @apiParam (Body) {String} color 태그 색
 * @apiParamExample {json} RequestBodyExample
 * {
 *   "name": "tag1",
 *   "color": "#000000"
 * }
 *
 * @apiSampleRequest /v1/tags
 * @apiSuccess (SUCCESS) {String} msg 성공메시지
 * @apiSuccessExample {json} SuccessResponse
 * {
 *     "msg": "success"
 * }
 */
tagRouter.post('/', tagController.createTag);

// tag 읽기
tagRouter.get('/');

// tag 수정
tagRouter.patch('/');

// tag 삭제
tagRouter.delete('/');

export default tagRouter;
