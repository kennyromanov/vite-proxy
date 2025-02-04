import { IncomingMessage, ServerResponse } from 'http';
import { Socket } from 'net';
import { createProxyServer } from 'http-proxy';
import {err, err as logErr, log, warn} from './logger';
import { getTargetFromUrl } from './config';

// Create a single reusable proxy instance
const proxy = createProxyServer({
    changeOrigin: true,
    ws: true,
    secure: false
});

// Handle proxy errors globally
proxy.on('error', (err, req, res) => {
    logErr(err, 'Proxy error');
    if (res && 'writeHead' in res) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Proxy error');
    }
});

export function proxyRequest(req: IncomingMessage, res: ServerResponse, targetOrigin: string) {
    // We remove the first segment from the path because it indicates the route
    const urlSegments = req.url?.split('/') ?? [];
    const newPath = urlSegments.slice(1).join('/'); // everything after the origin

    // Construct the final URL for the target
    // for example, /app1/api => http://example.com/api
    const targetUrl = `${targetOrigin}/${newPath}`;

    log('Proxying request to: ' + targetUrl);

    proxy.web(
        req,
        res,
        { target: targetOrigin },
        (error) => {
            logErr(error, 'Proxy.web encountered an error');
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error during proxying request');
        }
    );
}

export function handleUpgrade(req: IncomingMessage, socket: Socket, head: Buffer) {
    const targetOrigin = getTargetFromUrl(req.url);
    if (!targetOrigin) {
        warn('Problem: no origin found for WebSocket URL');
        socket.destroy();
        return;
    }

    const segments = req.url?.split('/') ?? [];
    const wsPath = segments.slice(1).join('/');
    const wsTarget = `${targetOrigin.replace(/^http/, 'ws')}/${wsPath}`;

    log('(:) Proxying WebSocket to: ' + wsTarget, 'blue');

    proxy.ws(
        req,
        socket,
        head,
        { target: wsTarget },
        (error) => {
            logErr(error, 'Proxy.ws encountered an error');
            socket.destroy();
        }
    );
}
