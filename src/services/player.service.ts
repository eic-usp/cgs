import { Op } from 'sequelize';
import Player from '../models/player.model.js';
import Match from '../models/match.model.js';

const playerService = {
    create: async (player: Player): Promise<Player> => await Player.create(player),
    getById: async (playerId: string): Promise<Player> => {
        const player = await Player.findByPk(playerId, { raw: true });

        if (player === null) {
            throw new Error('Player not found.');
        }

        return player;
    },
    getByEmailOrId: async (emailOrId: string): Promise<Player> => {
        const player = await Player.findOne({
            where: {
                [Op.or]: [
                    { id: emailOrId },
                    { email: emailOrId}
                ]
            },
            raw: true
        });

        if (player === null) {
            throw new Error('Player not found.');
        }

        return player;
    },
    getPersonalBest: async (playerId: string, gameId: string): Promise<number> => {
        const personalBest : number = await Match.max('score',
        {
            where: {
                gameId: gameId,
                playerId: playerId
            }
        });

        if (personalBest === null)
        {
            throw new Error('No scores found.', {
                cause: {
                    code: 'NoScoreFound',
                    values: [playerId, gameId]
                }
            });
        }

        return personalBest;
    }
};

export default playerService;