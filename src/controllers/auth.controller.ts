import { Request, Response, Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import { ErrorHandler, handleError } from '../error';
import User from '../models/user';
import authValidations from '../middlewares/validators/auth/auth.validator';
import validator from '../middlewares/validator';

const router = Router();

router.post('/', authValidations, validator, async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                const custom = new ErrorHandler(400, 'Invalid credentials');
                handleError(custom, req, res);
            }
            const payload = {
                user: {
                    id: user.id
                }
            };
            jwt.sign(payload, config.get('jwt_secret'), {expiresIn: 3600}, (err, token) => {
                if (err) throw err;
                res.status(200).json({token});
            });
        } else {
            const custom = new ErrorHandler(400, 'Invalid user');
            handleError(custom, req, res);
        }
    } catch {
        const custom = new ErrorHandler(500, 'Server error');
        handleError(custom, req, res);
    }
});

export default router;