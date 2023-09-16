import { Sequelize } from 'sequelize';
import Game from '../models/game.model.js';
import Match from '../models/match.model.js';

const gameService = {
    getById: async (gameId: string): Promise<Game> => {
        const game = await Game.findByPk(gameId);

        if (game === null) {
            throw new Error('Game not found.');
        }

        return game;
    },
    getRankings: async (gameId: string, playerId?: string): Promise<Match[] | Match> => {
        const rankingsData = await Match.findAll({
            attributes: [
                'playerId',
                [Sequelize.fn('max', Sequelize.col('score')), 'highScore'],
                'playedAt'
            ],
            where: {
                gameId: gameId,
                ...(playerId) && { playerId: playerId }
            },
            group: 'playerId',
            order: [
                ['highScore', 'DESC']
            ]
        });

        if (rankingsData === null || rankingsData.length == 0) {
            throw new Error('No rankings were found.');
        }

        return (playerId && rankingsData[0]) || rankingsData;
    }
};

export default gameService;