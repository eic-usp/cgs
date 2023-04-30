import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ForeignKeyConstraintError, ValidationError } from 'sequelize';
import Controller from './Controller';
import Match from "../models/match.model";

const create = async (req: Request<never, never, Match>, res: Response): Promise<Response> => {
    const match = req.body;
    match.playerId = req.user.id;

    try {
        await Match.create(match);
        return res.status(StatusCodes.OK).send('Match created successfully.');
    } catch (e) {
        if (e instanceof ForeignKeyConstraintError || e instanceof ValidationError) {
            return res.status(StatusCodes.BAD_REQUEST).send(e);
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
    }
}

const matchController: Controller = {
    create: create
}

export default matchController;