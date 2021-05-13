import GoogleAuthLibrary, { OAuth2Client } from 'google-auth-library';
import { NextFunction, Request, Response } from 'express';
import Exceptions from '../exceptions';

import Configs from '../config';

const client = new OAuth2Client(Configs.googleClientId);

/**
 * @author 강성모(castleMo)
 * @since 2021/04/14
 *
 * @param req    Request
 * @param res    Response
 * @param next  NextFunction
 */
const googleIdTokenVerify = async (req: Request, res: Response, next: NextFunction) => {
	try {
		// idToken이 존재하지않으면 에러
		if (!req.headers.authorization) throw new Exceptions.WantodoException(10002, 'authorization is empty');
		const idToken: string = req.headers.authorization;

		// token decoding 하기
		const ticket: GoogleAuthLibrary.LoginTicket | void = await client
			.verifyIdToken({
				idToken,
				audience: Configs.googleClientId, // Specify the CLIENT_ID of the app that accesses the backend
			})
			.catch((err: Error) => {
				console.log(Object.keys(err));
				next(err);
			});

		// ticket이 존재하지않으면 에러
		// todo: Error model 정의하기
		if (!ticket) throw new Error('ticket is empty');

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
		if (!payload) throw new Error('plyload is empty');

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
