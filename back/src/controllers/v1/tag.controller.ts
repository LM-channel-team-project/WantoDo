import { NextFunction, Request, Response } from 'express';
import { body, header, param, validationResult } from 'express-validator';
import tagService from '../../services/v1/tag.service';
import Utils from '../../common/Utils';
import Exceptions from '../../exceptions';

//  21/4/29 by 현빈 - 임시코드 - createTag

/**
 * @author 강성모(castleMo)
 * @since 21/05/03
 *
 * @param req  Request
 * @param res  Response
 * @param next  NextFunction
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
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			const msg: string = Utils.mixingValidationErrorMessage(validationErrors);
			throw new Exceptions.WantodoException(10001, msg);
		}

		const { user } = res.locals;
		const { name, color } = req.body;

		const result = await tagService.createTag(user, name, color);
		res.status(200).send(result);
	} catch (err) {
		next(err);
	}
};

/**
 * @author 강성모(castleMo)
 * @since 21/05/03
 *
 * @param req  Request
 * @param res  Response
 * @param next  NextFunction
 */
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
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			const msg: string = Utils.mixingValidationErrorMessage(validationErrors);
			throw new Exceptions.WantodoException(10001, msg);
		}

		const { user } = res.locals;

		const result = await tagService.getTags(user);
		res.status(200).send(result);
	} catch (err) {
		next(err);
	}
};

/**
 * @author 강성모(castleMo)
 * @since 21/05/03
 *
 * @param req  Request
 * @param res  Response
 * @param next  NextFunction
 */
export const updateTag = async (req: Request, res: Response, next: NextFunction) => {
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
			param('tagId').isUUID('4').withMessage('is not UUID version4 value ').run(req),
			body('name')
				.optional({ checkFalsy: true })
				.trim()
				.notEmpty()
				.withMessage('is empty')
				.bail()
				.isString()
				.withMessage('is not String value')
				.run(req),
			body('color')
				.optional({ checkFalsy: true })
				.trim()
				.notEmpty()
				.withMessage('is empty')
				.bail()
				.isHexColor()
				.withMessage('is not HexColor value')
				.run(req),
		]);

		// validation Error
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			const msg: string = Utils.mixingValidationErrorMessage(validationErrors);
			throw new Exceptions.WantodoException(10001, msg);
		}

		const { user } = res.locals;
		const { tagId } = req.params;
		const { name, color } = req.body;

		const result = await tagService.updateTag(user, tagId, name, color);
		res.status(200).send(result);
	} catch (err) {
		next(err);
	}
};

/**
 * @author 강성모(castleMo)
 * @since 21/05/03
 *
 * @param req  Request
 * @param res  Response
 * @param next  NextFunction
 */
export const deleteTag = async (req: Request, res: Response, next: NextFunction) => {
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
			param('tagId').isUUID('4').withMessage('is not UUID version4 value ').run(req),
		]);

		// validation Error
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			const msg: string = Utils.mixingValidationErrorMessage(validationErrors);
			throw new Exceptions.WantodoException(10001, msg);
		}

		const { user } = res.locals;
		const { tagId } = req.params;

		const result = await tagService.deleteTag(user, tagId);
		res.status(200).send(result);
	} catch (err) {
		next(err);
	}
};

export default {
	createTag,
	getTags,
	updateTag,
	deleteTag,
};
