import { Router } from 'express';
import tagController from '../../controllers/v1/tag.controller';

// 라우터 토대 생성 21/4/29 by 현빈
const tagRouter = Router();

/**
 * @author 강성모(castleMo)
 * @since 21/05/03
 */
/**
 * @api {post} /v1/tags Tag 생성
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

/**
 * @author 강성모(castleMo)
 * @since 21/05/03
 */
/**
 * @api {get} /v1/tags Tag 조회
 * @apiName getTags
 * @apiGroup Tags
 * @apiVersion 1.0.0
 *
 * @apiUse HeaderToken
 *
 * @apiSampleRequest /v1/tags
 * @apiSuccess (SUCCESS) {Object} data Response Data Object
 * @apiSuccess (SUCCESS) {Array} data.tags 태그 배열
 * @apiSuccess (SUCCESS) {String} data.tags.tagId 태그 id
 * @apiSuccess (SUCCESS) {String} data.tags.name 태그 이름
 * @apiSuccess (SUCCESS) {String} data.tags.color 태그 색
 * @apiSuccess (SUCCESS) {String} msg 성공메시지
 * @apiSuccessExample {json} SuccessResponse
 * {
 *     "msg": "success",
 *     "data": {
 *       "tags": [
 *         {
 *           "tagId": "ffac950b-5dad-4523-b0b1-786573abbf12",
 *           "name": "tag1",
 *           "color": "#000000"
 *         },
 *         {
 *           "tagId": "ffac950b-5dad-4523-b0b1-786573abbf13",
 *           "name": "tag2",
 *           "color": "#222222"
 *         },
 *         {
 *           "tagId": "ffac950b-5dad-4523-b0b1-786573abbf11",
 *           "name": "tag3",
 *           "color": "#111111"
 *         }
 *       ]
 *     }
 * }
 */
tagRouter.get('/', tagController.getTags);

// tag 수정
/**
 * @author 강성모(castleMo)
 * @since 21/05/03
 */
/**
 * @api {patch} /v1/tags Tag 수정
 * @apiName updateTag
 * @apiGroup Tags
 * @apiVersion 1.0.0
 *
 * @apiUse HeaderToken
 *
 * @apiParam (Body) {String} [name] 태그 이름
 * @apiParam (Body) {String} [color] 태그 색
 * @apiParamExample {json} RequestBodyExample (name)
 * {
 *   "name": "tag1"
 * }
 *
 * @apiParamExample {json} RequestBodyExample (color)
 * {
 *   "color": "#000000"
 * }
 *
 * @apiParamExample {json} RequestBodyExample (All)
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
tagRouter.patch('/:tagId', tagController.updateTag);

// tag 삭제
tagRouter.delete('/');

export default tagRouter;
