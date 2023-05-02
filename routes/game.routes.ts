import express from 'express';
import gameController from '../controllers/game.controller';

const gameRoutes = express.Router();

gameRoutes.get('/:id/rankings', gameController.rankings);

export default gameRoutes;