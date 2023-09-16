import express from 'express';
import playerController from '../controllers/player.controller.js';
import auth from '../middlewares/auth.middleware.js';

const playerRoutes = express.Router();

playerRoutes.post('/', playerController.create);
playerRoutes.get('/', auth.verify, playerController.getStatus);
// playerRoutes.get('/', playerController.findAll);
// playerRoutes.get('/:id', playerController.find);
// playerRoutes.put('/:id', playerController.update);
// playerRoutes.delete('/:id', playerController.remove);
playerRoutes.post('/login', playerController.login);
playerRoutes.get('/validate', auth.verify, playerController.validate);
playerRoutes.get('/:gameId/ranking', auth.verify, playerController.getRanking);

export default playerRoutes;