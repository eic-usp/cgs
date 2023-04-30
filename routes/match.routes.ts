import express from 'express';
import matchController from "../controllers/match.controller";

const matchRoutes = express.Router();

matchRoutes.post('/', matchController.create);

export default matchRoutes;