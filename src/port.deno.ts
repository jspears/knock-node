export { emitWarning } from "https://deno.land/std@0.172.0/node/process.ts";
export function getEnv(key:string):string | undefined{
    return Deno.env.get(key);
}