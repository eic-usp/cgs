import express from 'express';
import gameController from '../controllers/game.controller.js';

const gameRoutes = express.Router();

gameRoutes.get('/:id/rankings', gameController.getRankings);

export default gameRoutes;