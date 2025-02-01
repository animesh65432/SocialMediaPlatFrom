import express from 'express';
import controllers from '../../controllers';
import middleware from '../../middlewares';

const UserRouter = express.Router();

UserRouter.post('/create', controllers.UserControllers.createtheuser);
UserRouter.post('/login', controllers.UserControllers.logintheuser);
UserRouter.get('/seeothersPeoples/:userId', middleware, controllers.UserControllers.OthersPeoplesSee);
UserRouter.put('/updatefollowers/:userId', middleware, controllers.UserControllers.addfollowers);
export default UserRouter;
