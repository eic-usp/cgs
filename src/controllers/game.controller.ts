import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Controller from './Controller.js';
import gameService from '../services/game.service.js';

const getRankings = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
    try {
        const gameId = req.params.id;
        await gameService.getById(gameId);
        const rankingsData = await gameService.getRankings(gameId);
        return res.status(StatusCodes.OK).json(rankingsData);
    } catch (e) {
        console.log(e);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
    }
};

interface GameController extends Controller {
    getRankings: (red: Request<{ id: string }>, res: Response) => Promise<Response>;
}

const gameController: GameController = {
    getRankings: getRankings
};

export default gameController;