import express from 'express';
import matchController from "../controllers/match.controller";
import auth from '../middlewares/auth.middleware';

const matchRoutes = express.Router();

matchRoutes.post('/', auth.verify, matchController.create);

export default matchRoutes;