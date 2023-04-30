import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Controller from './Controller';
import Match from "../models/match.model";

const create = async (req: Request<never, never, Match>, res: Response): Promise<Response> => {
    const match = req.body;

    try {
        await Match.create(match);
        return res.status(StatusCodes.OK).send('Match created successfully.');
    } catch (e) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
    }
}

const matchController: Controller = {
    create: create
}

export default matchController;