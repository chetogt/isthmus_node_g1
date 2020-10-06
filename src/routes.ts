import { Express } from 'express';
import health_controller from './controllers/health.controller';
import user_controller from './controllers/user.controller';

const routes = (app: Express): void => {
    app.use('/v1/health', health_controller);
    app.use('/v1/users', user_controller);
};

export default routes;