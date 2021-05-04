import { NextFunction, Request, Response } from 'express';
import * as profileService from '../../services/v1/profile.service';

/**
 * @author 강성모(castleMo)
 * @since 21/05/04
 *
 * @param req 	Request
 * @param res		Response
 * @param next	NextFunction
 */
export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
	try {
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
 * @param req 	Request
 * @param res		Response
 * @param next	NextFunction
 */
export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { user } = res.locals;
		const result = await profileService.updateProfile(user);
		res.status(200).send(result);
	} catch (error) {
		next(error);
	}
};

export default {
	getProfile,
	updateProfile,
};
