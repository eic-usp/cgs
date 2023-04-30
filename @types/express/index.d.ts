import Player from '../../models/player.model';

declare global {
    namespace Express {
        export interface Request {
            user: Partial<Player>;
        }
    }
}