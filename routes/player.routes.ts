import express from 'express';
import playerController from '../controllers/player.controller';

const playerRoutes = express.Router();

playerRoutes.post('/', playerController.create);
// playerRoutes.get('/', playerController.findAll);
// playerRoutes.get('/:id', playerController.find);
// playerRoutes.put('/:id', playerController.update);
// playerRoutes.delete('/:id', playerController.remove);
playerRoutes.post('/login', playerController.login);

export default playerRoutes;