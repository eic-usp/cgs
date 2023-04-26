import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import db from '../db';

class Player extends Model<InferAttributes<Player>, InferCreationAttributes<Player>> {
    declare id: string;
    declare password: string;
    declare email: string;
    declare firstName: string;
    declare lastName: string;
    declare birthdate: Date;

    declare readonly createdAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;
}

 Player.init(
    {
        id: {
            primaryKey: true,
            type: DataTypes.STRING,
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
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {
        sequelize: db.sequelize
    }
);

export default Player;