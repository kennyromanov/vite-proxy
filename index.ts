import http from 'http';
import { handleRequest } from './requestHandler';
import { handleUpgrade } from './proxyHandler';

function startServer(port: number) {
    const server = http.createServer((req, res) => {
        handleRequest(req, res);
    });

    // Listen to the `upgrade` event and proxy the WebSocket requests as well.
    server.on('upgrade', (req, socket, head) => {
        handleUpgrade(req, socket, head);
    });

    server.listen(port, () => {
        console.info(`Proxy server started on port ${port}`);
    });
}

// Start the server on port 5000 for demonstration.
startServer(5000);
