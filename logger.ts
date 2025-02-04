import chalk from 'chalk';
import { Color, PaintFunction } from './types';
import config from './config';

export function defaultPaint(val: string): string {
    return val;
}

export function log(message: string, color: Color | null = null): void {
    if (!config?.logging) return;

    const paint: PaintFunction = chalk[color] ?? defaultPaint;

    console.log(paint(message));
}

export function warn(message: string, color: Color | null = null): void {
    log(message, color);
}

export function err(e: Error, message: string | null = null): void {
    const error = e?.message ?? 'Unknown Error';

    if (message)
        warn(message + ': ' + error, 'red');
    else
        warn(error, 'red');
}
