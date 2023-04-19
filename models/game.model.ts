import db from '../db';
import { DataTypes } from 'sequelize';

const Game = db.sequelize.define('Game', {
    gameId: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [0, 10]
        }
    },
    displayName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlphanumeric: true
        }
    },
});

export default Game;