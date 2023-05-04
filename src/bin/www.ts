#!/usr/bin/env node

import http from 'http';
import app from '../app.js';
import config from '../config.js';

const server = http.createServer(app);
const port = config.SERVER_PORT;

app.set('port', port);

server.listen(port, (): void => {
    console.log(`Listening on port ${port}.`);
});

export default server;