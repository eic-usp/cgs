import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import config from './config.js';
import db from './db.js';
import playerRoutes from './routes/player.routes.js';
import matchRoutes from './routes/match.routes.js';
import gameRoutes from './routes/game.routes.js';

import Game from './models/game.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(morgan('dev'));

try {
    await db.connect();

    if (config.NODE_ENV === 'development' && config.RESET_DATABASE_ON_START) {
        await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true });
        await db.sequelize.sync({ force: true });
        await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { raw: true });

        await Game.create({
            id: 'TestGame',
            displayName: 'Some Game'
        });
    } else {
        await db.sequelize.sync();
    }
} catch (e) {
    console.error(e);
}

app.use('/', express.static(path.join(__dirname, 'public'), { extensions: ['html'] }));
app.use('/ping', (_, res) => res.status(200).send('Pong'));

app.use('/api/player', playerRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/game', matchRoutes);

export default app;