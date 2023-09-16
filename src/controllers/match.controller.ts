import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ForeignKeyConstraintError, ValidationError } from 'sequelize';
import Controller from './Controller.js';
import Match from "../models/match.model.js";
import matchService from '../services/match.services.js';
import playerService from '../services/player.service.js';

const create = async (req: Request<{ gameId: string }, never, Match>, res: Response): Promise<Response> => {
    const match = req.body;
    match.playerId = req.user.id;
    match.gameId = req.params.gameId;

    try {
        let newPersonalBest = false;

        try {
            const personalBest = await playerService.getPersonalBest(match.playerId, match.gameId);
            newPersonalBest = (match.score > personalBest);
        } catch (e) {
            console.error(e);

            const cause = (e as Error).cause as ErrorCause;

            if (cause !== undefined && cause.code === 'NoScoreFound') {
                newPersonalBest = true;
            } else {
                throw e;
            }
        }

        await matchService.create(match);

        return res.status(StatusCodes.OK).send({ newPersonalBest: newPersonalBest });
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