import { Request, Response } from 'express';
import { Model } from 'sequelize';

export default interface Controller {
    create: (req: Request<never, never, Model>, res: Response) => Promise<Response>;
    update?: (req: Request<never, never, Model>, res: Response) => Promise<Response>;
    remove?: (req: Request<never, never, { id: string }>, res: Response) => Promise<Response>;
    find?: (req: Request<never, never, { id: string }>, res: Response) => Promise<Response>;
    findAll?: (req: Request<never, never, { id: string }>, res: Response) => Promise<Response>;
}