import db from '../db';
import { DataTypes } from 'sequelize';

const Player = db.sequelize.define('Player', {
    playerId: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4, 10]
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8, 100]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlpha: true
        }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlpha: true
        }
    },
    birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            birthdateValidator(value: string): void {
                if (new Date(value).toDateString() > new Date().toDateString()) {
                    throw new Error('Birthdate cannot be a future date.');
                }
            }
        }
    }
});

export default Player;