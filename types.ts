export type Color = 'blue' | 'green' | 'red' | 'yellow';

export type Config = {
    routes: Record<string, string>,
    port: number,
    logging: boolean,
};

export type PaintFunction = (val: string) => string;
