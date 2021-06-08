import { NextFunction, Request, Response } from 'express';
import { body, header, validationResult } from 'express-validator';
import accountService from '../../services/v1/account.service';
import Utils from '../../common/Utils';
import Exceptions from '../../exceptions';

/**
 * @author 강성모(castleMo)
 * @since 2021/04/25
 *
 * @param req    Request
 * @param res    Response
 * @param next  NextFunction
 */
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
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			const msg: string = Utils.mixingValidationErrorMessage(validationErrors);
			throw new Exceptions.WantodoException(10001, msg);
		}

		const { user } = res.locals;
		const result = await accountService.isUserExist(user);
		res.status(200).send(result);
	} catch (err) {
		next(err);
	}
};

/**
 * @author 강성모(castleMo)
 * @since 2021/04/13
 *
 * @param req    Request
 * @param res    Response
 * @param next  NextFunction
 */
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
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			const msg: string = Utils.mixingValidationErrorMessage(validationErrors);
			throw new Exceptions.WantodoException(10001, msg);
		}

		const { user } = res.locals;
		const result = await accountService.loginUser(user);
		res.status(200).send(result);
	} catch (error) {
		next(error);
	}
};

/**
 * @author 강성모(castleMo)
 * @since 2021/04/14
 *
 * @param req    Request
 * @param res    Response
 * @param next  NextFunction
 */
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
			body('isNotification')
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
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			const msg: string = Utils.mixingValidationErrorMessage(validationErrors);
			throw new Exceptions.WantodoException(10001, msg);
		}

		const { user } = res.locals;
		const { theme, isNotification, beginningOfWeek } = req.body;
		const result = await accountService.updateUserSettings(user, theme, isNotification, beginningOfWeek);
		res.status(200).send(result);
	} catch (error) {
		next(error);
	}
};

/**
 * @author 강성모(castleMo)
 * @since 2021/04/15
 *
 * @param req    Request
 * @param res    Response
 * @param next  NextFunction
 */
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
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			const msg: string = Utils.mixingValidationErrorMessage(validationErrors);
			throw new Exceptions.WantodoException(10001, msg);
		}

		const { user } = res.locals;
		const result = await accountService.withdrawUser(user);
		res.status(200).send(result);
	} catch (error) {
		next(error);
	}
};

/**
 * @author 강성모(castleMo)
 * @since 2021/05/04
 *
 * @param req    Request
 * @param res    Response
 * @param next  NextFunction
 */
export const successTutorial = async (req: Request, res: Response, next: NextFunction) => {
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
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			const msg: string = Utils.mixingValidationErrorMessage(validationErrors);
			throw new Exceptions.WantodoException(10001, msg);
		}

		const { user } = res.locals;
		const result = await accountService.successTutorial(user);
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
	successTutorial,
};
