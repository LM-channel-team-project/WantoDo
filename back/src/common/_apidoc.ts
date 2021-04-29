/**
 * @api {post} /v1/accounts/login 로그인
 * @apiName loginUser
 * @apiGroup Accounts
 * @apiVersion 1.0.0
 *
 * @apiUse HeaderToken
 *
 * @apiSampleRequest /v1/accounts/login
 * @apiSuccess (SUCCESS) {Object} data Response Data Object
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
