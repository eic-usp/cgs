import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import db from '../db.js';

class Game extends Model<InferAttributes<Game>, InferCreationAttributes<Game>> {
    declare id: string;
    declare displayName: string;

    declare readonly createdAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;
}

Game.init(
    {
        id: {
            primaryKey: true,
            type: DataTypes.STRING,
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
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    },
    {
        sequelize: db.sequelize
    }
);


export default Game;