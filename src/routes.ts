import { Express } from 'express';
import health_controller from './controllers/health.controller';
import user_controller from './controllers/user.controller';
import auth_controller from './controllers/auth.controller';
import contact_controller from './controllers/contact.controller';

const routes = (app: Express): void => {
    app.use('/v1/health', health_controller);
    app.use('/v1/users', user_controller);
    app.use('/v1/auth', auth_controller);
    app.use('/v1/contacts', contact_controller);
};

export default routes;