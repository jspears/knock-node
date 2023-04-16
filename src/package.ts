import * as fs from "fs";
import * as path from "path";
import { TextDecoder } from "util";
export function getPackage(): Record<string,unknown> {
    for(const dir of [".", ".."]) {
        const file = path.join(__dirname, dir, "package.json");
        if (fs.existsSync(file)) {
            return JSON.parse(
                new TextDecoder("utf-8").decode(
                    fs.readFileSync(
                       file
                    ) as Uint8Array
                )
            );
        }
    }
    throw new Error(`Could not find package.json in ${__dirname} or ${path.join(__dirname, "..")}`);
}