import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ForeignKeyConstraintError, ValidationError } from 'sequelize';
import Controller from './Controller.js';
import Match from "../models/match.model.js";
import matchService from '../services/match.services.js';

const create = async (req: Request<{ gameId: string }, never, Match>, res: Response): Promise<Response> => {
    const match = req.body;
    match.playerId = req.user.id;
    match.gameId = req.params.gameId;

    try {
        await matchService.create(match);
        return res.status(StatusCodes.OK).send('Match created successfully.');
    } catch (e) {
        console.error(e);
        if (e instanceof ForeignKeyConstraintError || e instanceof ValidationError) {
            return res.status(StatusCodes.BAD_REQUEST).send(e);
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
    }
};

const matchController: Controller = {
    create: create
};

export default matchController;