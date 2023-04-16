export const emitWarning = process.emitWarning;
export function getEnv(key: string): string | undefined {
    return process.env[key];
}

export function bufferFrom(...args:Parameters<typeof Buffer.from>): Buffer {
    return Buffer.from(...args);
};