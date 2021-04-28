import { NextFunction, Request, Response } from 'express';
import { header, validationResult } from 'express-validator';
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
		]);

		// validation Error
		// todo: Error model 정의하기
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			throw new Error('updateUserSettings validationError');
		}

		const { user } = res.locals;
		const result = await taskService.createTask(user);
		res.status(200).send(result);
	} catch (err) {
		next(err);
	}
};

export default {
	createTask,
};
