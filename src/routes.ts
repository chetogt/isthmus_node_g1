import { Express } from 'express';
import health_controller from './controllers/health.controller';

const routes = (app: Express): void => {
    app.use('/v1/health', health_controller);
};

export default routes;