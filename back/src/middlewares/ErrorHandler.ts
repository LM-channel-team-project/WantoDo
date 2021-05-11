import { NextFunction, Request, Response } from 'express';

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
	if ('type' in error) {
		res.status(error.status).send({
			name: error.name,
			type: error.type,
			errorCode: error.errorCode,
			message: error.message,
		});
	} else {
		next(error);
	}
};

export default errorHandler;
