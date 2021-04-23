import GoogleAuthLibrary, { OAuth2Client } from 'google-auth-library';
import { NextFunction, Request, Response } from 'express';
import Configs from '../config';

const client = new OAuth2Client(Configs.googleClientId);

//  Created by 강성모(castleMo) on 2021/04/14
const googleIdTokenVerify = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const idToken: string | undefined = req.headers.authorization;

		// idToken이 존재하지않으면 에러
		// todo: Error model 정의하기
		if (!idToken) throw new Error();

		// token decoding 하기
		const ticket: GoogleAuthLibrary.LoginTicket = await client.verifyIdToken({
			idToken,
			audience: Configs.googleClientId, // Specify the CLIENT_ID of the app that accesses the backend
		});

		// ticket이 존재하지않으면 에러
		// 왜 ticket이라고 할까?
		// todo: Error model 정의하기
		if (!ticket) throw new Error();

		const payload: GoogleAuthLibrary.TokenPayload = ticket.getPayload()!;

		/*  혹시 모를 api
			const {data} = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo',
				{
					headers: {
					Authorization: 'Bearer' + accessToken,
				}
			});
		*/

		// payload data 없을시 에러
		// todo: Error model 정의하기
		if (!payload) throw new Error('');

		res.locals.user = {
			platformId: payload.sub,
			email: payload.email,
			profileImageUrl: payload.picture,
			platform: 'google',
			name: payload.name,
		};

		next();
	} catch (err) {
		next(err);
	}
};

export default googleIdTokenVerify;
