#!/usr/bin/env bun

import http from 'http';
import chalk from 'chalk';
import { handleRequest } from './requestHandler';
import { handleUpgrade } from './proxyHandler';
import { log } from './logger';
import config from './config';

const port = config?.port ?? 5000;

function startServer(port: number) {
    const server = http.createServer((req, res) => {
        handleRequest(req, res);
    });

    // Listen to the `upgrade` event and proxy the WebSocket requests as well.
    server.on('upgrade', (req, socket, head) => {
        handleUpgrade(req, socket, head);
    });

    server.listen(port, () => {
        log('(+) Proxy server started on port ' + port, 'green');
    });
}

startServer(port);
