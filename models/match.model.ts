import { DataTypes, Model } from 'sequelize';
import db from '../db';
import Player from './player.model';
import Game from './game.model';

interface MatchAttributes {
    playerId: string;
    gameId: string;
    playedAt: Date;
    score: number;
}

class Match extends Model<MatchAttributes> implements MatchAttributes {
    declare playerId: string;
    declare gameId: string;
    declare playedAt: Date;
    declare score: number;
}

Match.init({
    playerId: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Player,
            key: 'id'
        }
    },
    gameId: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Game,
            key: 'id'
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
});

Player.belongsToMany(Game, { through: { model: Match, unique: false }, foreignKey: 'playerId' });
Game.belongsToMany(Player, { through: { model: Match, unique: false }, foreignKey: 'gameId' });

export default Match;