import { Router } from 'express';
import profileController from '../../controllers/v1/profile.controller';

// 21/04/13 profile 라우터 생성 by 현빈 - 1번째 라우팅 만들어주기
// 21/4/16 라우터 수정 by 현빈
const profileRouter = Router();

/**
 * @author 강성모(castleMo)
 * @since 21/05/04
 */
/**
 * @api {get} /v1/profiles profile 조회
 * @apiName getProfile
 * @apiGroup Profiles
 * @apiVersion 1.0.0
 *
 * @apiUse HeaderToken
 *
 * @apiSampleRequest /v1/profiles
 * @apiSuccess (SUCCESS) {Object} data Response Data Object
 * @apiSuccess (SUCCESS) {String} data.nickname 닉네임
 * @apiSuccess (SUCCESS) {String} data.email 이메일
 * @apiSuccess (SUCCESS) {String} data.platform 플랫폼
 * @apiSuccess (SUCCESS) {String} data.motto motto
 * @apiSuccess (SUCCESS) {String} data.profileImageUrl 이미지 URL
 * @apiSuccess (SUCCESS) {Object} data.settings 유저 settings
 * @apiSuccess (SUCCESS) {String} data.settings.theme 테마 설정 (default | dark)
 * @apiSuccess (SUCCESS) {Boolean} data.settings.isNotification 알림 받을 여부
 * @apiSuccess (SUCCESS) {String} data.settings.beginningOfWeek 한주의 시작 설정 (sunday | monday)
 * @apiSuccess (SUCCESS) {String} msg 성공메시지
 * @apiSuccessExample {json} SuccessResponse
 * {
 *     "msg": "success"
 *     "data": {
 *         "nickname": "강성모",
 *         "email": "eodah4115@gmail.com",
 *         "platform": "google",
 *         "motto": "착하게 살자",
 *         "profileImageUrl": "https://image.com",
 *         "isTutorial": false,
 *         "settings": {
 *           "theme": "default",
 *           "isNotification": false,
 *           "beginningOfWeek": "sunday"
 *         },
 *         "notifications": [],
 *     }
 * }
 */
profileRouter.get('/', profileController.getProfile);

/**
 * @author 강성모(castleMo)
 * @since 21/05/04
 */
/**
 * @api {patch} /v1/profiles profile 수정
 * @apiName updateProfile
 * @apiGroup Profiles
 * @apiVersion 1.0.0
 *
 * @apiUse HeaderToken
 *
 * @apiParam (Body) {String} [nickname] 닉네임
 * @apiParam (Body) {String} [motto] 좌우명
 * @apiParam (Body) {String} [profileImageUrl] 이미지 URL
 * @apiParamExample {json} RequestBodyExample (nickname)
 * {
 *     "nickname": "castleMo"
 * }
 *
 * @apiParamExample {json} RequestBodyExample (motto)
 * {
 *     "motto": "No pain, no gain"
 * }
 *
 * @apiParamExample {json} RequestBodyExample (profileImageUrl)
 * {
 *     "profileImageUrl": "https://image.com"
 * }
 *
 * @apiParamExample {json} RequestBodyExample (All)
 * {
 *     "nickname": "castleMo",
 *     "motto": "No pain, no gain",
 *     "profileImageUrl": "https://image.com"
 * }
 *
 * @apiSampleRequest /v1/profiles
 * @apiSuccess (SUCCESS) {String} msg 성공메시지
 * @apiSuccessExample {json} SuccessResponse
 * {
 *     "msg": "success"
 * }
 */
profileRouter.patch('/', profileController.updateProfile);

export default profileRouter;
