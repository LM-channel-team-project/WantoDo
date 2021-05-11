import { Router } from 'express';

import taskController from '../../controllers/v1/task.controller';

const taskRouter = Router();

/**
 * @author 강성모(castleMo)
 * @since 2021/04/29
 */
/**
 * @api {post} /v1/tasks Task 생성
 * @apiName createTask
 * @apiGroup Tasks
 * @apiVersion 1.0.0
 *
 * @apiUse HeaderToken
 *
 * @apiParam (Body) {Object} period 기간
 * @apiParam (Body) {Number} period.start 시작 시간
 * @apiParam (Body) {Number} period.end 종료 시간
 * @apiParam (Body) {String} contents 내용
 * @apiParam (Body) {Array} [tags] 태그 Id
 * @apiParam (Body) {Number} [important] 중요도
 * @apiParamExample {json} RequestBodyExample (default)
 * {
 *     "contents": "Hello world",
 *     "period": {
 *       "start": 1621473199000,
 *       "end": 1621473199000
 *     }
 * }
 *
 * @apiParamExample {json} RequestBodyExample (default + tags)
 * {
 *     "contents": "Hello world",
 *     "period": {
 *       "start": 1621473199000,
 *       "end": 1621473199000
 *     },
 *     "tags": [
 *       {
 *         "tagId": "5eae854a-6379-4151-9d20-6d7ac8e89b32",
 *         "isMainTag": true,
 *       },
 *       {
 *         "tagId": "5eae854a-6379-4151-9d20-6d7ac8e89b34",
 *         "isMainTag": false,
 *       },
 *       {
 *         "tagId": "5eae854a-6379-4151-9d20-6d7ac8e89b33",
 *         "isMainTag": false,
 *       }
 *     ]
 * }
 *
 *
 *
 * @apiParamExample {json} RequestBodyExample (default + important)
 * {
 *     "contents": "Hello world",
 *     "period": {
 *       "start": 1621473199000,
 *       "end": 1621473199000
 *     },
 *     "important": 2
 * }
 *
 * @apiParamExample {json} RequestBodyExample (All)
 * {
 *     "contents": "Hello world",
 *     "tags": [
 *       {
 *         "tagId": "5eae854a-6379-4151-9d20-6d7ac8e89b32",
 *         "isMainTag": true,
 *       },
 *       {
 *         "tagId": "5eae854a-6379-4151-9d20-6d7ac8e89b34",
 *         "isMainTag": false,
 *       },
 *       {
 *         "tagId": "5eae854a-6379-4151-9d20-6d7ac8e89b33",
 *         "isMainTag": false,
 *       }
 *     ],
 *     "period": {
 *       "start": 1621473199000,
 *       "end": 1621473199000
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
 */
taskRouter.post('/', taskController.createTask);

/**
 * @author 강성모(castleMo)
 * @since 2021/05/05
 */
/**
 * @api {get} /v1/tasks Task 조회
 * @apiName getTasks
 * @apiGroup Tasks
 * @apiVersion 1.0.0
 *
 * @apiUse HeaderToken
 *
 * @apiParam (Query Parameter) {Number} year 년
 * @apiParam (Query Parameter) {Number} month 월
 * @apiParam (Query Parameter) {Number} [day] 일
 *
 * @apiSampleRequest /v1/tasks
 * @apiSuccess (SUCCESS) {Object} data Response Data Object
 * @apiSuccess (SUCCESS) {Array} data.tasks Task 배열
 * @apiSuccess (SUCCESS) {String} data.tasks.taskId Task id
 * @apiSuccess (SUCCESS) {String} data.tasks.contents 내용
 * @apiSuccess (SUCCESS) {Number} data.tasks.important 중요도
 * @apiSuccess (SUCCESS) {Boolean} data.tasks.isChecked 수행 여부
 * @apiSuccess (SUCCESS) {Array} data.tasks.tags 태그 배열
 * @apiSuccess (SUCCESS) {String} data.tasks.tags.tagId 태그 id
 * @apiSuccess (SUCCESS) {Boolean} data.tasks.tags.isMainTag 메인 태그 여부
 * @apiSuccess (SUCCESS) {Object} data.tasks.period 시작 종료 기간 객체
 * @apiSuccess (SUCCESS) {Number} data.tasks.period.start 시작
 * @apiSuccess (SUCCESS) {Number} data.tasks.period.end 종료
 * @apiSuccess (SUCCESS) {Number} data.tasks.createdTimestamp 생성 일자
 * @apiSuccess (SUCCESS) {Number} data.tasks.updatedTimestamp 업데이트 일자
 * @apiSuccess (SUCCESS) {String} msg 성공메시지
 * @apiSuccessExample {json} SuccessResponse
 * {
 *     "msg": "success",
 *     "data": {
 *       "tasks": [
 *         {
 *           "period": {
 *            "start": 1620201453000,
 *            "end": 1620201453000
 *           },
 *           "isChecked": false,
 *           "important": 0,
 *           "updatedTimestamp": 0,
 *           "taskId": "958c10bd-c946-4170-9d92-33eead88eea1",
 *           "contents": "test3",
 *           "tags": [
 *             {
 *               "tagId": "958c10bd-c946-4170-9d92-33eead88eea2",
 *               "isMainTag": true
 *             }
 *           ],
 *           "createdTimestamp": 1620201587228
 *          },
 *          {
 *            "period": {
 *              "start": 1621473199000,
 *              "end": 1621473199000
 *            },
 *            "isChecked": false,
 *            "important": 0,
 *            "updatedTimestamp": 0,
 *            "taskId": "86c2b5c9-5242-49b3-b79a-c72f4942d7d9",
 *            "contents": "test3",
 *            "tags": [],
 *            "createdTimestamp": 1620201877457
 *          }
 *       ]
 *     }
 * }
 */
taskRouter.get('/', taskController.getTasks);

/**
 * @author 강성모(castleMo)
 * @since 2021/05/01
 */
/**
 * @api {patch} /v1/tasks/:taskId Task 수정
 * @apiName updateTask
 * @apiGroup Tasks
 * @apiVersion 1.0.0
 *
 * @apiUse HeaderToken
 * @apiParam (Path Variable) {String} taskId task Id
 *
 * @apiParam (Body) {Object} [period] 기간
 * @apiParam (Body) {Number} period.start 시작 시간
 * @apiParam (Body) {Number} period.end 종료 시간
 * @apiParam (Body) {String} [contents] 내용
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
 *       {
 *         "tagId": "5eae854a-6379-4151-9d20-6d7ac8e89b32",
 *         "isMainTag": true,
 *       },
 *       {
 *         "tagId": "5eae854a-6379-4151-9d20-6d7ac8e89b34",
 *         "isMainTag": false,
 *       },
 *       {
 *         "tagId": "5eae854a-6379-4151-9d20-6d7ac8e89b33",
 *         "isMainTag": false,
 *       }
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
 *       {
 *         "tagId": "5eae854a-6379-4151-9d20-6d7ac8e89b32",
 *         "isMainTag": true,
 *       },
 *       {
 *         "tagId": "5eae854a-6379-4151-9d20-6d7ac8e89b34",
 *         "isMainTag": false,
 *       },
 *       {
 *         "tagId": "5eae854a-6379-4151-9d20-6d7ac8e89b33",
 *         "isMainTag": false,
 *       }
 *     ],
 *     "period": {
 *       "start": 21039210,
 *       "end": 31820938
 *     },
 *     "important": 2
 * }
 *
 * @apiSampleRequest /v1/tasks/:taskId
 * @apiSuccess (SUCCESS) {String} msg 성공메시지
 * @apiSuccessExample {json} SuccessResponse
 * {
 *     "msg": "success"
 * }
 *
 */
taskRouter.patch('/:taskId', taskController.updateTask);

/**
 * @author 강성모(castleMo)
 * @since 2021/04/30
 */
/**
 * @api {delete} /v1/tasks/:taskId Task 삭제
 * @apiName deleteTask
 * @apiGroup Tasks
 * @apiVersion 1.0.0
 *
 * @apiUse HeaderToken
 * @apiParam (Path Variable) {String} taskId task Id
 *
 * @apiSampleRequest /v1/tasks/:taskId
 * @apiSuccess (SUCCESS) {String} msg 성공메시지
 * @apiSuccessExample {json} SuccessResponse
 * {
 *     "msg": "success"
 * }
 *
 */
taskRouter.delete('/:taskId', taskController.deleteTask);

export default taskRouter;
