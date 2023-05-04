import { Sequelize, Op } from 'sequelize';
import Player from '../models/player.model.js';

const playerService = {
    create: async (player: Player): Promise<Player> => await Player.create(player),
    getById: async (playerId: string): Promise<Player> => {
        const player = await Player.findByPk(playerId);

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
            }
        });

        if (player === null) {
            throw new Error('Player not found.');
        }

        return player;

    }
}

export default playerService;