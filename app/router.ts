import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);

  // user group
  router.post('/user', controller.user.list);
  router.put('/user', controller.user.add);
  router.patch('/user', controller.user.update);
  router.get('/user/:id', controller.user.details);
  router.delete('/user', controller.user.delelte);
};
