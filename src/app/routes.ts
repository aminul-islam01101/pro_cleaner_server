import express from 'express';

const routes = express.Router();

routes.get('/health', (req, res) => {
  res.send('OK');
});
// test commit for husky

// const moduleRoutes = [

//   {
//     path: '/auth',
//     route: emailAuthRoutes,
//   },
// ];

// moduleRoutes.forEach((route) => routes.use(route.path, route.route));

export default routes;
