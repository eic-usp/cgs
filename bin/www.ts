#!/usr/bin/env node

import http from 'http';
import app from '../app.js';

const server = http.createServer(app);

const port = process.env['PORT'] || 3001;
app.set('port', port);

server.listen(port);

export default server;