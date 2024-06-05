import fs from "fs";
import colors from "ansi-colors";
import {instagram} from "gradient-string";

export function updatePrismaSchemaFunction(dirSource: any, content: any): void {
    let getFileContent: any;
    try {
        getFileContent = fs.readFileSync(content, "utf8");
    } catch (err: any) {
        console.log(`Error reading file: ${colors.bgRed(`${colors.white(`${err.message}`)}`)}`);
    }

    try {
        fs.writeFileSync(
            dirSource,
            getFileContent,
            {flag: "a+"},
        );
    } catch (err: any) {
        console.log(`${colors.bgRed(`${colors.white(`${err.message}`)}`)}`);
        process.exit(0);
    }
}