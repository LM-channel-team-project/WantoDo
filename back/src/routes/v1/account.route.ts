import {Request, Response, NextFunction, Router} from 'express';

import * as accountController from '../../controllers/v1/account.controller';

const accountRouter = Router();

//todo: Error example 추가해야함

/**
 * @api {post} /v1/accounts/login 로그인
 * @apiName loginUser
 * @apiGroup Accounts
 * @apiVersion 1.0.0
 *
 * @apiUse HeaderToken
 *
 * @apiSampleRequest /v1/accounts/login
 * @apiSuccess (SUCCESS) {String} msg 성공메시지
 * @apiSuccess (SUCCESS) {String} nickname 닉네임
 * @apiSuccess (SUCCESS) {String} email 성공메시지
 * @apiSuccess (SUCCESS) {String} platform 플랫폼
 * @apiSuccess (SUCCESS) {String} motto motto
 * @apiSuccess (SUCCESS) {String} profileImageUrl 이미지 URL
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