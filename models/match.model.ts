import { DataTypes } from 'sequelize';
import db from '../db';
import Player from './player.model';
import Game from './game.model';

const Match = db.sequelize.define('Match', {
    playerId: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Player,
            key: 'playerId'
        }
    },
    gameId: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Game,
            key: 'gameId'
        }
    },
    playedAt: {
        primaryKey: true,
        type: DataTypes.DATE,
        allowNull: false
    },
    score: {
        type: DataTypes.INTEGER,
        validate: {
            scoreValidator: (value: number): void => {
                if (value < 0) {
                    throw new Error('Score cannot be negative.');
                }
            }
        }
    }
}, {
    createdAt: 'playedAt',
    updatedAt: false,
});

Player.belongsToMany(Game, { through: { model: Match, unique: false }, foreignKey: 'playerId' });
Game.belongsToMany(Player, { through: { model: Match, unique: false }, foreignKey: 'gameId' });

export default Match;