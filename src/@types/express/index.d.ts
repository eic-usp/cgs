import Player from '../../models/player.model.js';

declare global {
    namespace Express {
        export interface Request {
            user: Partial<Player>;
        }
    }
}