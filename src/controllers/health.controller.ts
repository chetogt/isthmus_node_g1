import express, { Request, Response } from 'express';
import config from 'config';

const port = config.get('port');

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    return res.status(200).json({
        server_up: true,
        port: port,
        environment: config.get('environment'),
        lesson: 'ONE'
    });
});

export default router;