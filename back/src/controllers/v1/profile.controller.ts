import { NextFunction, Request, Response } from 'express';
import * as profileService from '../../services/v1/profile.service';

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { user } = res.locals;
		const result = await profileService.getProfile(user); // 여기있는 getProfile은 service.ts에 있는 함수인듯!!
		res.status(200).send(result);
	} catch (error) {
		next(error);
	}
};

export const updateProfile = async (req: Request, res: Response) => {
	res.json({
		message: 'Hello',
	});
};

export default {
	getProfile,
	updateProfile,
};
