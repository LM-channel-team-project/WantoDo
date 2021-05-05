import { NextFunction, Request, Response } from 'express';
import { body, header, validationResult } from 'express-validator';
import * as profileService from '../../services/v1/profile.service';

/**
 * @author 강성모(castleMo)
 * @since 21/05/04
 *
 * @param req  Request
 * @param res    Response
 * @param next  NextFunction
 */
export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
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
			validationErrors.array().forEach((value) => {
				console.log(value);
			});
			throw new Error('error');
		}

		const { user } = res.locals;
		const result = await profileService.getProfile(user);
		res.status(200).send(result);
	} catch (error) {
		next(error);
	}
};

/**
 * @author 강성모(castleMo)
 * @since 21/05/04
 *
 * @param req  	Request
 * @param res   Response
 * @param next  NextFunction
 */
export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
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
			body('nickname')
				.optional({ checkFalsy: true })
				.trim()
				.notEmpty()
				.withMessage('is empty')
				.bail()
				.isString()
				.withMessage('is not String value')
				.bail()
				.isLength({ min: 0, max: 10 })
				.withMessage('nickname length must be greater than 0 or less than 10')
				.run(req),
			body('motto')
				.optional({ checkFalsy: true })
				.trim()
				.notEmpty()
				.withMessage('is empty')
				.bail()
				.isString()
				.withMessage('is not String value')
				.bail()
				.isLength({ min: 0, max: 30 })
				.withMessage('motto length must be greater than 0 or less than 30')
				.run(req),
			body('profileImageUrl')
				.optional({ checkFalsy: true })
				.trim()
				.notEmpty()
				.withMessage('is empty')
				.bail()
				.isString()
				.withMessage('is not String value')
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
		const { nickname, motto, profileImageUrl } = req.body;
		const result = await profileService.updateProfile(user, {
			nickname,
			motto,
			profileImageUrl,
		});
		res.status(200).send(result);
	} catch (error) {
		next(error);
	}
};

export default {
	getProfile,
	updateProfile,
};
