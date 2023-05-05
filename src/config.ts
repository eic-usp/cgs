import 'dotenv/config';
import { Dialect } from 'sequelize';

const config = {
    NODE_ENV: process.env['NODE_ENV'],
    SERVER_PORT: process.env['SERVER_PORT'] as unknown as number,
    DB_URI: process.env['DB_URI'],
    DB_DIALECT: process.env['DB_DIALECT'] as Dialect,
    JWT_KEY: process.env['JWT_KEY'],
    JWT_EXPIRES_IN: process.env['JWT_EXPIRES_IN'],
    COOKIE_NAME_AUTHORIZATION: process.env['COOKIE_NAME_AUTHORIZATION'],
    get cookieOptions() {
        return {
            httpOnly: true,
            secure: this.NODE_ENV === 'production'
        };
    }
};

export default config;