import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Sequelize } from 'sequelize';
import Controller from './Controller';
import Game from '../models/game.model';
import Match from '../models/match.model';

const rankings = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
    try {
        const gameId = req.params.id;

        if (await Game.findByPk(gameId) === null) {
            throw new Error('Game not found.');
        }

        const data = await Match.findAll({
            attributes: [
                'playerId',
                [Sequelize.fn('max', Sequelize.col('score')), 'highScore'],
                'playedAt'
            ],
            where: {
                gameId: gameId
            },
            group: 'playerId',
            order: [
                ['highScore', 'DESC']
            ]
        });

        if (data === null || data.length == 0) {
            throw new Error('No rankings were found.');
        }

        return res.status(StatusCodes.OK).json(data);
    } catch (e) {
        console.log(e);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
    }
}

interface GameController extends Controller {
    rankings: (red: Request<{ id: string }>, res: Response) => Promise<Response>;
}

const gameController: GameController = {
    rankings: rankings
}

export default gameController;