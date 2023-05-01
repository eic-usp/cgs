import express from 'express';
import playerController from '../controllers/player.controller';
import auth from '../middlewares/auth.middleware';

const playerRoutes = express.Router();

playerRoutes.post('/', playerController.create);
// playerRoutes.get('/', playerController.findAll);
// playerRoutes.get('/:id', playerController.find);
// playerRoutes.put('/:id', playerController.update);
// playerRoutes.delete('/:id', playerController.remove);
playerRoutes.post('/login', playerController.login);
playerRoutes.post('/validate', auth.verify, playerController.validate);

export default playerRoutes;