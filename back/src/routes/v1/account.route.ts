import { Router } from 'express';

import accountController from '../../controllers/v1/account.controller';

const accountRouter = Router();

// todo: Error example 추가해야함

/**
 * @author 강성모(castleMo)
 * @since 2021/04/25
 */
/**
 * @api {get} /v1/accounts/signed 회원가입 여부 확인
 * @apiName isUserExist
 * @apiGroup Accounts
 * @apiVersion 1.0.0
 *
 * @apiUse HeaderToken
 *
 * @apiSampleRequest /v1/accounts/signed
 * @apiSuccess (SUCCESS) {Object} data Response Data Object
 * @apiSuccess (SUCCESS) {Boolean} data.isUserExist 유저 회원 여부 (true: 회원가입 됨 | false: 회원가입 필요함)
 * @apiSuccess (SUCCESS) {String} msg 성공메시지
 * @apiSuccessExample {json} SuccessResponse
 * {
 *     "msg": "success",
 *     "data": {
 *         "isUserExist": true
 *     }
 * }
 */
accountRouter.get('/signed', accountController.isUserExist);

/**
 * @author 강성모(castleMo)
 * @since 2021/04/13
 */
/**
 * @api {post} /v1/accounts/login 로그인
 * @apiName loginUser
 * @apiGroup Accounts
 * @apiVersion 1.0.1
 *
 * @apiUse HeaderToken
 *
 * @apiSampleRequest /v1/accounts/login
 * @apiSuccess (SUCCESS) {Object} data Response Data Object
 * @apiSuccess (SUCCESS) {String} data.nickname 닉네임
 * @apiSuccess (SUCCESS) {String} data.email 이메일
 * @apiSuccess (SUCCESS) {String} data.platform 플랫폼
 * @apiSuccess (SUCCESS) {String} data.motto motto
 * @apiSuccess (SUCCESS) {String} data.profileImageUrl 이미지 URL
 * @apiSuccess (SUCCESS) {Boolean} data.isTutorial 튜토리얼 진행 여부
 * @apiSuccess (SUCCESS) {Array} data.notifications 유저 notification tokens
 * @apiSuccess (SUCCESS) {Object} data.settings 유저 settings
 * @apiSuccess (SUCCESS) {String} data.settings.theme 테마 설정 (default | dark)
 * @apiSuccess (SUCCESS) {Boolean} data.settings.isNotification 알림 받을 여부
 * @apiSuccess (SUCCESS) {String} data.settings.beginningOfWeek 한주의 시작 설정 (sunday | monday)
 * @apiSuccess (SUCCESS) {String} msg 성공메시지
 * @apiSuccessExample {json} SuccessResponse
 * {
 *     "msg": "success",
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
accountRouter.post('/login', accountController.loginUser);

/**
 * @author 강성모(castleMo)
 * @since 2021/04/14
 */
/**
 * @api {patch} /v1/accounts/settings 회원 설정 수정
 * @apiName updateUserSettings
 * @apiGroup Accounts
 * @apiVersion 1.0.0
 *
 * @apiUse HeaderToken
 *
 * @apiParam (Body) {String} [theme] 테마 (default | dark)
 * @apiParam (Body) {Boolean} [isNotification] 알림설정 여부
 * @apiParam (Body) {String} [beginningOfWeek] 한주의 시작 요일 (monday | sunday)
 * @apiParamExample {json} RequestBodyExample (theme)
 * {
 *     "theme": "dark"
 * }
 *
 * @apiParamExample {json} RequestBodyExample (isNotification)
 * {
 *     "isNotification": true
 * }
 *
 * @apiParamExample {json} RequestBodyExample (beginningOfWeek)
 * {
 *     "beginningOfWeek": "monday"
 * }
 *
 * @apiSampleRequest /v1/accounts/settings
 * @apiSuccess (SUCCESS) {String} msg 성공메시지
 * @apiSuccessExample {json} SuccessResponse
 * {
 *     "msg": "success"
 * }
 */
accountRouter.patch('/settings', accountController.updateUserSettings);

/**
 * @author 강성모(castleMo)
 * @since 2021/04/15
 */
/**
 * @api {delete} /v1/accounts 회원탈퇴
 * @apiName withdrawUser
 * @apiGroup Accounts
 * @apiVersion 1.0.0
 *
 * @apiUse HeaderToken
 *
 * @apiSampleRequest /v1/accounts
 * @apiSuccess (SUCCESS) {String} msg 성공메시지
 * @apiSuccessExample {json} SuccessResponse
 * {
 *     "msg": "success"
 * }
 */
accountRouter.delete('/', accountController.withdrawUser);

/**
 * @author 강성모(castleMo)
 * @since 2021/05/04
 */
/**
 * @api {post} /v1/accounts/tutorial 튜툐리얼 완료
 * @apiName successTutorial
 * @apiGroup Accounts
 * @apiVersion 1.0.0
 *
 * @apiUse HeaderToken
 *
 * @apiSampleRequest /v1/accounts/tutorial
 * @apiSuccess (SUCCESS) {String} msg 성공메시지
 * @apiSuccessExample {json} SuccessResponse
 * {
 *     "msg": "success"
 * }
 */
accountRouter.post('/tutorial', accountController.successTutorial);

export default accountRouter;
