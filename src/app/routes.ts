import express from 'express';
import { emailAuthRoutes } from './modules/auths/emailAuth/emailAuth.routes';
import { userRoutes } from './modules/users/user.routes';
import { categoryRoutes } from './modules/categories/category.routes';
import { serviceRoutes } from './modules/services/service.routes';
import { slotRoutes } from './modules/slots/slot.routes';

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
  {
    path: '/categories',
    route: categoryRoutes,
  },
  {
    path: '/services',
    route: serviceRoutes,
  },
  {
    path: '/slots',
    route: slotRoutes,
  },
];

moduleRoutes.forEach((route) => routes.use(route.path, route.route));

export default routes;
