import fs from "node:fs";
import colors from "ansi-colors";

export function createFileFunction(keysPath: string, fileContent: string): void {
    let getFileContent: any;
    try {
        getFileContent = fs.readFileSync(fileContent, "utf8");
    } catch (err: any) {
        console.log(`Error reading file: ${colors.bgRed(`${colors.white(`${err.message}`)}`)}`);
    }

    try {
        fs.writeFileSync(
            keysPath,
            getFileContent,
            {flag: "a+"},
        );
    } catch (err: any) {
        console.log(`Error writing file : ${colors.bgRed(`${colors.white(`${err.message}`)}`)}`);
        process.exit(0);
    }
}