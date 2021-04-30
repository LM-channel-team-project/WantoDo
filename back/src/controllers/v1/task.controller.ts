import { NextFunction, Request, Response } from 'express';
import { body, header, validationResult } from 'express-validator';
import taskService from '../../services/v1/task.service';

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await Promise.all([
			header('Authorization')
				.trim()
				.notEmpty()
				.withMessage('is empty')
				.bail()
				.isJWT()
				.withMessage('is not JWT value')
				.run(req),
			body('contents')
				.trim()
				.notEmpty()
				.withMessage('is empty')
				.bail()
				.isLength({ min: 1, max: 50 })
				.withMessage('contents length must be greater than 1 or less than 50')
				.run(req),
			body('tags')
				.optional({ checkFalsy: true })
				.isArray()
				.withMessage('is not Array value')
				.bail()
				.isArray({ min: 1 })
				.withMessage('Array length must be greater than 1')
				.run(req),
			body('tags.*')
				.trim()
				.notEmpty()
				.withMessage('is empty')
				.bail()
				.isString()
				.withMessage('is not String value')
				.bail()
				.isUUID('4')
				.withMessage('is not UUID value')
				.run(req),
			body('period')
				.optional({ checkFalsy: true })
				.notEmpty()
				.withMessage('is empty')
				.bail()
				.isObject()
				.withMessage('is not Object value')
				.custom((value) => {
					return value.start !== undefined && value.end !== undefined;
				})
				.withMessage('not properties')
				.run(req),
			body('important')
				.optional()
				.notEmpty()
				.withMessage('is empty')
				.bail()
				.isInt({ min: 0, max: 3 })
				.withMessage('is not Number value')
				.bail()
				.run(req),
		]);

		// validation Error
		// todo: Error model 정의하기
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			validationErrors.array().forEach((value) => {
				console.log(value);
			});
			throw new Error('error');
		}

		const { user } = res.locals;
		const { contents, tags, period, important } = req.body;
		const result = await taskService.createTask(user, contents, {
			tags,
			period,
			important,
		});
		res.status(200).send(result);
	} catch (err) {
		next(err);
	}
};

export default {
	createTask,
};
