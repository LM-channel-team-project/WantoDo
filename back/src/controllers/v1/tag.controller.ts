import { NextFunction, Request, Response } from 'express';
import { body, header, validationResult } from 'express-validator';
import tagService from '../../services/v1/tag.service';

//  21/4/29 by 현빈 - 임시코드 - createTag

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
        ]);

        // validation Error
        // todo: Error model 정의하기
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            throw new Error('updateUserSettings validationError');
        }

        const { tag } = res.locals;
        const result = await tagService.createTag(tag);
        res.status(200).send(result);
    } catch (err) {
        next(err);


    }
};


export default {

};

