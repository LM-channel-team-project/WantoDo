import { Router } from 'express';

import accountController from '../../controllers/v1/account.controller';

const accountRouter = Router();

// todo: Error example 추가해야함

/**
 * @api {get} /v1/accounts/signed 회원가입 여부 확인
 * @apiName isExistUser
 * @apiGroup Accounts
 * @apiVersion 1.0.0
 *
 * @apiUse HeaderToken
 *
 * @apiSampleRequest /v1/accounts/signed
 * @apiSuccess (SUCCESS) {Object} data Response Data
 * @apiSuccess (SUCCESS) {Boolean} data.existUserFlag 유저 회원 여부 (true: 회원가입 됨 | false: 회원가입 필요함)
 * @apiSuccess (SUCCESS) {String} msg 성공메시지
 * @apiSuccessExample {json} SuccessResponse
 * {
 *     "msg": "success",
 *     "data": {
 *         "existUserFlag": true
 *     }
 * }
 */
accountRouter.get('/signed', accountController.isExistUser);

/**
 * @api {post} /v1/accounts/login 로그인
 * @apiName loginUser
 * @apiGroup Accounts
 * @apiVersion 1.0.0
 *
 * @apiUse HeaderToken
 *
 * @apiSampleRequest /v1/accounts/login
 * @apiSuccess (SUCCESS) {Object} data Response Data
 * @apiSuccess (SUCCESS) {String} data.nickname 닉네임
 * @apiSuccess (SUCCESS) {String} data.email 성공메시지
 * @apiSuccess (SUCCESS) {String} data.platform 플랫폼
 * @apiSuccess (SUCCESS) {String} data.motto motto
 * @apiSuccess (SUCCESS) {String} data.profileImageUrl 이미지 URL
 * @apiSuccess (SUCCESS) {String} msg 성공메시지
 * @apiSuccessExample {json} SuccessResponse
 * {
 *     "msg": "success",
 *     "data": {
 *         "nickname": "강성모",
 *         "email": "eodah4115@gmail.com",
 *         "platform": "google",
 *         "motto": "착하게 살자",
 *         "profileImageUrl": "https://image.com"
 *     }
 * }
 */
accountRouter.post('/login', accountController.loginUser);

/**
 * @api {patch} /v1/accounts/settings 회원 설정 수정
 * @apiName updateUserSettings
 * @apiGroup Accounts
 * @apiVersion 1.0.0
 *
 * @apiUse HeaderToken
 *
 * @apiParam (Body) {String} [theme] 테마 (default | dark)
 * @apiParam (Body) {Boolean} [notificationFlag] 알림설정 여부
 * @apiParam (Body) {String} [beginningOfWeek] 한주의 시작 요일 (monday | sunday)
 * @apiParamExample {json} RequestBodyExample (theme)
 * {
 *     "theme": "dark"
 * }
 *
 * @apiParamExample {json} RequestBodyExample (notificationFlag)
 * {
 *     "notificationFlag": true
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

export default accountRouter;
