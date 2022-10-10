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

  // character group
  router.post('/character', controller.character.list);
  router.put('/character', controller.character.add);
  router.patch('/character', controller.character.update);
  router.get('/character/:id', controller.character.details);
  router.delete('/character', controller.character.delelte);

  // mguser group
  router.post('/mguser', controller.mguser.list);
  router.put('/mguser', controller.mguser.add);
  router.patch('/mguser', controller.mguser.update);
  router.get('/mguser/:id', controller.mguser.details);
  router.delete('/mguser', controller.mguser.delelte);
};
