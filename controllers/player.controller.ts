import { Request, Response, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';
import Controller from './Controller';
import Player from "../models/player.model";

const create = async (req: Request<never, never, Player>, res: Response): Promise<Response> => {
    const player = req.body;
    
    try {
        player.password = await bcrypt.hash(req.body.password, 10);
        await Player.create(player);
        return res.status(StatusCodes.OK).send('Player created successfully.');
    } catch (e) {
        console.error(e);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
    }
}

interface PlayerLoginAttributes {
    emailOrId: string;
    password: string;
}

const cookie_authorization = 'authorization';

export const login = async (req: Request<never, never, PlayerLoginAttributes>, res: Response): Promise<Response> => {
    const { emailOrId, password } = req.body;

    if (!emailOrId || !password)  {
        return res.status(StatusCodes.BAD_REQUEST).end();
    }

    try {
        const player = await Player.findOne({
            where: {
                [Op.or]: [
                    { id: emailOrId },
                    { email: emailOrId}
                ]
            }
        });

        if (player === null) {
            throw new Error('Incorrect ID or email.')
        }

        if (await bcrypt.compare(password, player.password)) {
            const token = jwt.sign({ id: player.id, email: player.email }, config.JWT_KEY, { expiresIn: config.JWT_EXPIRES_IN });
            return res.cookie(cookie_authorization, `Bearer ${token}`, {
                httpOnly: true,
                secure: config.NODE_ENV === 'production'
            }).status(StatusCodes.OK).end();
        } else {
            throw new Error('Incorrect password');
        }
    } catch (e) {
        console.error(e);
        return res.status(StatusCodes.FORBIDDEN).send(e);
    }
}

// const update = (req: Request<never, never, Player>, res: Response): Promise<Response> {};
// const remove = (req: Request<never, never, { id: string }>, res: Response): Promise<Response> {};
// const find = (req: Request<never, never, { id: string }>, res: Response): Promise<Response> {};
// const findAll = (req: Request<never, never>, res: Response): Promise<Response> {};

interface PlayerController extends Controller {
    login: (req: Request<never, never, PlayerLoginAttributes>, res: Response) => Promise<Response>;
}

const playerController: PlayerController = {
    create: create,
    login: login
};

export default playerController;