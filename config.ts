import fs from 'fs';
import path from 'path';
import { Config } from './types.ts';

const PROJECT_ROOT = process.cwd();

const CONFIG_FILES = [ '.vpconfig.json', '.vite-proxy.config.json' ];

export const config = loadConfig();

function loadConfig(): Config | null {
    for (const file of CONFIG_FILES) {
        const filePath = path.join(PROJECT_ROOT, file);
        if (fs.existsSync(filePath)) {
            return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        }
    }

    return null;
}

export function getTargetFromUrl(url: string | undefined): string | null {
    if (!url) return null;

    // Extract the first path segment after '/'
    const segments = url.split('/');
    if (segments.length < 2) {
        return null;
    }

    // The root is something like "/app1"
    const root = '/' + segments[1];
    return config?.routes[root] ?? null;
}

export default config;
