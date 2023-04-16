export function getEnv(key:string):string | undefined{
    return Deno.env.get(key);
}
// tslint:disable-next-line:no-console
export const emitWarning = console.warn.bind(console);

export function bufferFrom(str: string, encoding: BufferEncoding|undefined): Buffer {
    return new Buffer(str, encoding);
}