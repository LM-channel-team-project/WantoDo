import { NextFunction, Request, Response } from 'express';
import { body, header, validationResult } from 'express-validator';
import accountService from '../../services/v1/account.service';

// Created by 강성모(castleMo) on 2021/04/25
export const isUserExist = async (req: Request, res: Response, next: NextFunction) => {
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
		const result = await accountService.isUserExist(user);
		res.status(200).send(result);
	} catch (err) {
		next(err);
	}
};

// Created by 강성모(castleMo) on 2021/04/13
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
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
		const result = await accountService.loginUser(user);
		res.status(200).send(result);
	} catch (error) {
		next(error);
	}
};

// Created by 강성모(castleMo) on 2021/04/26
// export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
// 	try {
// 		await Promise.all([
// 			header('Authorization')
// 				.trim()
// 				.notEmpty()
// 				.withMessage('is empty')
// 				.bail()
// 				.isJWT()
// 				.withMessage('is not JWT value')
// 				.run(req),
// 			body('subscription')
// 				.notEmpty()
// 				.withMessage('is empty')
// 				.bail()
// 				.isJSON()
// 				.withMessage('is not JSON value')
// 				.bail()
// 				.run(req),
// 			body('subscription.endpoint').notEmpty().withMessage('is empty').run(req),
// 		]);
//
// 		// validation Error
// 		// todo: Error model 정의하기
// 		const validationErrors = validationResult(req);
// 		if (!validationErrors.isEmpty()) {
// 			throw new Error('updateUserSettings validationError');
// 		}
//
// 		const { user } = res.locals;
// 		const result = await accountService.registerUser(user);
// 		res.status(200).send(result);
// 	} catch (error) {
// 		next(error);
// 	}
// };

//  Created by 강성모(castleMo) on 2021/04/14
export const updateUserSettings = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await Promise.all([
			body('theme')
				.optional({ checkFalsy: true })
				.trim()
				.notEmpty()
				.withMessage('is empty')
				.bail()
				.isString()
				.withMessage('is not String value')
				.bail()
				.isIn(['default', 'dark'])
				.withMessage('must be one of default or dark')
				.run(req),
			body('notificationFlag')
				.optional({ checkFalsy: true })
				.trim()
				.notEmpty()
				.withMessage('is empty')
				.bail()
				.isBoolean()
				.withMessage('is not Boolean value')
				.bail()
				.run(req),
			body('beginningOfWeek')
				.optional({ checkFalsy: true })
				.trim()
				.notEmpty()
				.withMessage('is empty')
				.bail()
				.isString()
				.withMessage('is not Boolean value')
				.bail()
				.isIn(['monday', 'sunday'])
				.withMessage('must be one of monday or sunday')
				.run(req),
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
		const { theme, notificationFlag, beginningOfWeek } = req.body;
		const result = await accountService.updateUserSettings(
			user,
			theme,
			notificationFlag,
			beginningOfWeek,
		);
		res.status(200).send(result);
	} catch (error) {
		next(error);
	}
};

//  Created by 강성모(castleMo) on 2021/04/15
export const withdrawUser = async (req: Request, res: Response, next: NextFunction) => {
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
		const result = await accountService.withdrawUser(user);
		res.status(200).send(result);
	} catch (error) {
		next(error);
	}
};

export default {
	loginUser,
	updateUserSettings,
	withdrawUser,
	isUserExist,
};
