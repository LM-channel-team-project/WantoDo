import { NextFunction, Request, Response } from 'express';
import { body, header, validationResult } from 'express-validator';
import tagService from '../../services/v1/tag.service';

//  21/4/29 by 현빈 - 임시코드 - createTag

/**
 * @author 강성모(castleMo)
 * @since 21/05/03
 *
 * @param req 	Request
 * @param res 	Response
 * @param next	NextFunction
 */
export const createTag = async (req: Request, res: Response, next: NextFunction) => {
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
			body('name')
				.trim()
				.notEmpty()
				.withMessage('is empty')
				.bail()
				.isString()
				.withMessage('is not String value')
				.run(req),
			body('color')
				.trim()
				.notEmpty()
				.withMessage('is empty')
				.bail()
				.isHexColor()
				.withMessage('is not HexColor value')
				.run(req),
		]);

		// validation Error
		// todo: Error model 정의하기
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			throw new Error('updateUserSettings validationError');
		}

		const { user } = res.locals;
		const { name, color } = req.body;

		const result = await tagService.createTag(user, name, color);
		res.status(200).send(result);
	} catch (err) {
		next(err);
	}
};

export const getTags = async (req: Request, res: Response, next: NextFunction) => {
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

		const result = await tagService.getTags(user);
		res.status(200).send(result);
	} catch (err) {
		next(err);
	}
};

export default {
	createTag,
	getTags,
};
