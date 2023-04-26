import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './db';
import playerRoutes from './routes/player.routes';

import Game from './models/game.model';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const environment = process.env['NODE_ENV'];

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(morgan('combined'));

await db.connect();

if (environment === 'development') {
    try {
        await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true });
        await db.sequelize.sync({ force: true });
        await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { raw: true });
    } catch (e) {
        console.error(e);
    }
}

try {
    await Game.create({
        id: 'TestGame',
        displayName: 'Some Game'
    });
} catch (e)
{
    console.log(e);
}

app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/ping', (_, res) => res.status(200).send('Pong'));

app.use('/api/player', playerRoutes);

export default app;