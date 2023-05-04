import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize';
import db from '../db.js';
import Player from './player.model.js';
import Game from './game.model.js';

class Match extends Model<InferAttributes<Match>, InferCreationAttributes<Match>> {
    declare id: CreationOptional<number>;
    declare playerId: ForeignKey<string>;
    declare gameId: ForeignKey<string>;
    declare playedAt: CreationOptional<Date>;
    declare score: number;
}

Match.init(
    {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true
        },
        playerId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'AkMatch'
        },
        gameId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'AkMatch'
        },
        playedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            unique: 'AkMatch'
        },
        score: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            validate: {
                min: {
                    args: [0],
                    msg: 'Score cannot be negative.'
                }
            }
        }
    }, {
        createdAt: 'playedAt',
        updatedAt: false,
        sequelize: db.sequelize
    }
);

Player.belongsToMany(Game, { through: { model: Match, unique: false }, foreignKey: 'playerId' });
Game.belongsToMany(Player, { through: { model: Match, unique: false }, foreignKey: 'gameId' });

export default Match;