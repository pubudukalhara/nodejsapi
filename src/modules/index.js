import userRoutes from './users/user.routes';

export default app => {
  app.use('/', userRoutes);
};
