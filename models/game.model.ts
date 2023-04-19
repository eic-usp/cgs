import { DataTypes } from 'sequelize';
import db from '../db';

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
            notEmpty: true
        }
    },
});

export default Game;