import { DataTypes, Model } from 'sequelize';
import db from '../db';

interface PlayerAttributes {
    id: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
    birthdate: Date,
    highScore: number
}

class Player extends Model<PlayerAttributes> implements PlayerAttributes {
    declare id: string;
    declare password: string;
    declare email: string;
    declare firstName: string;
    declare lastName: string;
    declare birthdate: Date;
    declare highScore: number;

    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

 Player.init({
    id: {
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
            birthdateValidator: (value: string): void => {
                if (new Date(value) > new Date()) {
                    throw new Error('Birthdate cannot be a future date.');
                }
            }
        }
    },
    highScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: {
                args: [0],
                msg: 'Score cannot be negative.'
            }
        }
    },
}, {
    sequelize: db.sequelize
});

export default Player;