import express from 'express';
import { emailAuthRoutes } from './modules/auths/emailAuth/emailAuth.routes';

const routes = express.Router();

routes.get('/health', (req, res) => {
  res.send('OK');
});

const moduleRoutes = [
  {
    path: '/auth',
    route: emailAuthRoutes,
  },
];

moduleRoutes.forEach((route) => routes.use(route.path, route.route));

export default routes;
