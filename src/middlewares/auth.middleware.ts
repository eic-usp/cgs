import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config.js';

const verify = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const authorization = req.headers.authorization ?? req.cookies[config.COOKIE_NAME_AUTHORIZATION];

    if (!authorization) {
        return res.status(StatusCodes.UNAUTHORIZED).end();
    }

    try {
        const token = authorization.split(' ')[1];
        const payload = jwt.verify(token, config.JWT_KEY) as JwtPayload;

        req.user = { id: payload.id };

        return next();   
    } catch (e) {
        return res.status(StatusCodes.UNAUTHORIZED).end();
    }
};

const auth = {
    verify: verify
};

export default auth;