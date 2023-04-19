import 'dotenv/config';
import { Sequelize, SyncOptions } from 'sequelize';

const secret = process.env['MYSQL_URI'];

const sequelize = new Sequelize(secret, {
    dialect: 'mysql',
    sync: {
        force: true
    }
});

const db = {
    sequelize: sequelize,
    connect: async (): Promise<void> => {
        try {
            await sequelize.authenticate();
            console.log('Connection to the database has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    },
    sync: async (options?: SyncOptions): Promise<Sequelize> => {
        try {
            const res = await sequelize.sync(options);
            console.log("All models were synchronized successfully.");
            return res;
        } catch (error) {
            console.error('Unable to synchronize all models:', error);
        }
    }
};

export default db;