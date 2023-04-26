#!/usr/bin/env node

import 'dotenv/config';
import http from 'http';
import app from '../app.js';

const server = http.createServer(app);

const port = process.env['PORT'] || 3001;
app.set('port', port);

server.listen(port, (): void => {
    console.log(`Listening on port ${port}.`);
});

export default server;