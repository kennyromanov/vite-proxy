export const routes: Record<string, string> = {
    // For example, we map /app1 => https://example.com
    // or /app2 => http://another-origin.test
    // In reality, you can read this mapping from a config file.
    '/app': 'http://localhost:5173',
    '/contract': 'http://localhost:8001'
};

export function getTargetFromUrl(url: string | undefined): string | null {
    if (!url) return null;

    // Extract the first path segment after '/'
    const segments = url.split('/');
    if (segments.length < 2) {
        return null;
    }

    // The root is something like "/app1"
    const root = '/' + segments[1];
    return routes[root] ?? null;
}
