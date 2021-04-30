import { Router } from 'express';

import taskController from '../../controllers/v1/task.controller';

const taskRouter = Router();

/**
 * @api {post} /v1/tasks task 생성
 * @apiName createTask
 * @apiGroup Tasks
 * @apiVersion 1.0.0
 *
 * @apiUse HeaderToken
 *
 * @apiParam (Body) {Object} [period] 기간
 * @apiParam (Body) {Object} period.start 시작 시간
 * @apiParam (Body) {Object} period.end 종료 시간
 * @apiParam (Body) {String} contents 내용
 * @apiParam (Body) {Array} [tags] 태그 Id
 * @apiParam (Body) {Number} [important] 중요도
 * @apiParamExample {json} RequestBodyExample (contents)
 * {
 *     "contents": "Hello world"
 * }
 *
 * @apiParamExample {json} RequestBodyExample (contents + tags)
 * {
 *     "contents": "Hello world",
 *     "tags": [
 *       "5eae854a-6379-4151-9d20-6d7ac8e89b32",
 *       "5eae854a-6379-4151-9d20-6d7ac8e89b33",
 *       "5eae854a-6379-4151-9d20-6d7ac8e89b34"
 *     ]
 * }
 *
 * @apiParamExample {json} RequestBodyExample (contents + period)
 * {
 *     "contents": "Hello world",
 *     "period": {
 *       "start": 21039210,
 *       "end": 31820938
 *     }
 * }
 *
 * @apiParamExample {json} RequestBodyExample (contents + important)
 * {
 *     "contents": "Hello world",
 *     "important": 2
 * }
 *
 * @apiParamExample {json} RequestBodyExample (All)
 * {
 *     "contents": "Hello world",
 *     "tags": [
 *       "5eae854a-6379-4151-9d20-6d7ac8e89b32",
 *       "5eae854a-6379-4151-9d20-6d7ac8e89b33",
 *       "5eae854a-6379-4151-9d20-6d7ac8e89b34"
 *     ],
 *     "period": {
 *       "start": 21039210,
 *       "end": 31820938
 *     },
 *     "important": 2
 * }
 *
 * @apiSampleRequest /v1/tasks
 * @apiSuccess (SUCCESS) {String} msg 성공메시지
 * @apiSuccessExample {json} SuccessResponse
 * {
 *     "msg": "success"
 * }
 *
 * @apiSampleRequest /v1/tasks
 */
taskRouter.post('/', taskController.createTask);

taskRouter.get('/', taskController.getTasks);

taskRouter.patch('/:taskId', taskController.updateTask);

taskRouter.delete('/:taskId', taskController.deleteTask);

export default taskRouter;
