import { DataTypes, Model } from 'sequelize';
import db from '../db';

interface GameAttributes {
    id: string;
    displayName: string;
}

class Game extends Model<GameAttributes> implements GameAttributes {
    declare id: string;
    declare displayName: string;

    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

Game.init({
    id: {
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
}, {
        sequelize: db.sequelize
});


export default Game;