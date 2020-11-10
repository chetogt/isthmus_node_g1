import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { handleError, ErrorHandler} from '../error';

const validationHandler = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const err = new ErrorHandler(400, 'Invalid field');
    handleError(err, req, res);
};

export default validationHandler;