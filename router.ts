import routes from './.schema.json';

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
