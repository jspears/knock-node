import * as fs from "fs";
import * as path from "path";
import { TextDecoder } from "util";
export function getPackage(): Record<string,any> {
    return JSON.parse(
        new TextDecoder("utf-8").decode(
            fs.readFileSync(
                path.join(
                    __dirname,
                    "..", "package.json"
                )
            ) as Uint8Array
        )
    );
}