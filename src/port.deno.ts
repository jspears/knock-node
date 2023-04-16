export function getEnv(key:string):string | undefined{
    return Deno.env.get(key);
}
export const emitWarning = console.warn.bind(console);