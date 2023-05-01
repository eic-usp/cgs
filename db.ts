import { Sequelize, SyncOptions } from 'sequelize';
import config from './config';

const sequelize = new Sequelize(config.DB_URI, {
    dialect: config.DB_DIALECT,
    logging: config.NODE_ENV === 'development' ? console.log : false
});

const db = {
    sequelize: sequelize,
    connect: async (): Promise<void> => {
        try {
            await sequelize.authenticate();
            console.log('Connection to the database has been established successfully.');
        } catch (e) {
            console.error('Unable to connect to the database:', e);
        }
    },
    sync: async (options?: SyncOptions): Promise<Sequelize> => {
        try {
            const res = await sequelize.sync(options);
            console.log('All models were synchronized successfully.');
            return res;
        } catch (e) {
            console.error('Unable to synchronize all models:', e);
        }
    }
};

export default db;