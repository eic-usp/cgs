import 'dotenv/config';
import { Dialect } from 'sequelize';

const config = {
    NODE_ENV: process.env.NODE_ENV,
    RESET_DATABASE_ON_START: process.env.RESET_DATABASE_ON_START === 'true',
    SERVER_PORT: process.env.SERVER_PORT as unknown as number,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT as unknown as number,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DIALECT: process.env.DB_DIALECT as Dialect,
    JWT_KEY: process.env.JWT_KEY,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    COOKIE_NAME_AUTHORIZATION: process.env.COOKIE_NAME_AUTHORIZATION,
    get cookieOptions() {
        return {
            httpOnly: true,
            secure: this.NODE_ENV === 'production'
        };
    }
};

export default config;