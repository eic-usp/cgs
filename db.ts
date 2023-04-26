import 'dotenv/config';
import { Dialect, Sequelize, SyncOptions } from 'sequelize';

const uri = process.env['MYSQL_URI'];
const dialect: Dialect = process.env['DB_DIALECT'] as Dialect;
const environment = process.env['NODE_ENV'];

const sequelize = new Sequelize(uri, {
    dialect: dialect,
    logging: environment === 'development'
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