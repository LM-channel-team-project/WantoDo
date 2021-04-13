import { Request, Response, NextFunction } from "express";
import { body, header, param, query, validationResult } from "express-validator";
import * as accountService from '../../services/v1/account.service';

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = res.locals.user;
        const result = await accountService.loginUser(user);
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
}


