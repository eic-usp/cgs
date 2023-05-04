import express from 'express';
import matchController from "../controllers/match.controller.js";
import auth from '../middlewares/auth.middleware.js';

const matchRoutes = express.Router();

matchRoutes.post('/:gameId/match/', auth.verify, matchController.create);

export default matchRoutes;