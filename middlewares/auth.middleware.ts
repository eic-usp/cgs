import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

const verify = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const { authorization } = req.cookies;

    if (!authorization) {
        return res.status(StatusCodes.UNAUTHORIZED).send();
    }

    try {
        const token = authorization.split(' ')[1];
        const payload = jwt.verify(token, config.JWT_KEY) as JwtPayload;

        req.user = { id: payload.id };

        return next();   
    } catch (e) {
        return res.status(StatusCodes.UNAUTHORIZED).send();
    }
}

const auth = {
    verify: verify
}

export default auth;