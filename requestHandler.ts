import { IncomingMessage, ServerResponse } from 'http';
import { proxyRequest } from './proxyHandler';
import { getTargetFromUrl } from './config.ts';

export function handleRequest(req: IncomingMessage, res: ServerResponse) {
    try {
        // Ignore /favicon.ico requests
        if (req.url === '/favicon.ico') {
            res.writeHead(204);
            res.end();
            return;
        }

        console.log('Request URL:', req.url);

        // Retrieve the target origin from the URL using the routes map
        const targetOrigin = getTargetFromUrl(req.url);
        if (!targetOrigin) {
            console.warn('Problem: no origin found for this URL');
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('No origin found for this path');
            return;
        }

        // Pass control to the proxy handler
        proxyRequest(req, res, targetOrigin);
    } catch (exception: any) {
        console.error(`Request URL: ${req.url}, Exception:`, exception);
        res.statusCode = 500;
        res.statusMessage = String(exception);
        res.end('Internal Server Error');
    }
}
