import express from 'express';
import { emailAuthRoutes } from './modules/auths/emailAuth/emailAuth.routes';
import { userRoutes } from './modules/users/user.routes';

const routes = express.Router();

routes.get('/health', (req, res) => {
  res.send('OK');
});

const moduleRoutes = [
  {
    path: '/auth',
    route: emailAuthRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
];

moduleRoutes.forEach((route) => routes.use(route.path, route.route));

export default routes;
