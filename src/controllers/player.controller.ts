import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ForeignKeyConstraintError, ValidationError } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import Controller from './Controller.js';
import Player from '../models/player.model.js';
import Match from '../models/match.model.js';
import playerService from '../services/player.service.js';
import gameService from '../services/game.service.js';

const create = async (req: Request<never, never, Player>, res: Response): Promise<Response> => {
    const player = req.body;
    
    try {
        player.password = await bcrypt.hash(req.body.password, 10);
        await playerService.create(player);
        return res.status(StatusCodes.OK).send('Player created successfully.');
    } catch (e) {
        if (e instanceof ForeignKeyConstraintError || e instanceof ValidationError) {
            return res.status(StatusCodes.BAD_REQUEST).send(e);
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
    }
}

interface PlayerLoginAttributes {
    emailOrId: string;
    password: string;
}

const login = async (req: Request<never, never, PlayerLoginAttributes>, res: Response): Promise<Response> => {
    const { emailOrId, password } = req.body;

    if (!emailOrId || !password)  {
        return res.status(StatusCodes.BAD_REQUEST).end();
    }

    try {
        const player = await playerService.getByEmailOrId(emailOrId);

        if (await bcrypt.compare(password, player.password)) {
            const token = jwt.sign({
                id: player.id,
                email: player.email
            }, config.JWT_KEY, { expiresIn: config.JWT_EXPIRES_IN });

            delete player.password;

            return res.cookie(config.COOKIE_NAME_AUTHORIZATION, `Bearer ${token}`, config.cookieOptions).status(StatusCodes.OK).json({
                token: token,
                player: player
            });
        } else {
            throw new Error('Incorrect password');
        }
    } catch (e) {
        console.error(e);
        return res.status(StatusCodes.UNAUTHORIZED).send(e.message);
    }
}

const validate = async (req: Request, res: Response): Promise<Response> => {
    try {
        const playerId = req.user.id;
        await playerService.getById(playerId);
        return res.status(StatusCodes.OK).end();
    } catch (e) {
        return res.status(StatusCodes.UNAUTHORIZED).send(e.message);
    }
}

const getRanking = async (req: Request<{ gameId: string }>, res: Response): Promise<Response> => {
    try {
        const playerId = req.user.id;
        const gameId = req.params.gameId;
        const ranking = await gameService.getRankings(gameId, playerId) as Match;
        return res.status(StatusCodes.OK).json(ranking);
    } catch (e) {
        console.log(e);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
    }
}

// const update = (req: Request<never, never, Player>, res: Response): Promise<Response> {};
// const remove = (req: Request<{ id: string }>, res: Response): Promise<Response> {};
// const find = (req: Request<{ id: string }>, res: Response): Promise<Response> {};
// const findAll = (req: Request, res: Response): Promise<Response> {};

interface PlayerController extends Controller {
    login: (req: Request<never, never, PlayerLoginAttributes>, res: Response) => Promise<Response>;
    validate: (req: Request, res: Response) => Promise<Response>;
    getRanking: (req: Request<{ gameId: string }>, res: Response) => Promise<Response>;
}

const playerController: PlayerController = {
    create: create,
    login: login,
    validate: validate,
    getRanking: getRanking
};

export default playerController;