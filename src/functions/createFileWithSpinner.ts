import fs from 'fs';
import path from 'path';
import {createFileFunction} from "./createFile.function";
import colors from "ansi-colors";

export async function createFileWithSpinnerFunction(task: any): Promise<void> {
    let ora = (await import("ora")).default;
    const { path: filePath, template, label } = task;
    if (fs.existsSync(filePath)) {
        console.log(colors.bgCyan(colors.white(`${path.basename(filePath)} already exists`)) + '\n');
        process.exit();
    }
    const spinner = ora(`The creation of ${label} is processing`).start();
    let dirPath: string = '';
    try {
        dirPath = path.dirname(filePath);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
        createFileFunction(filePath, template);
        spinner.succeed(`${label} is done`);
    } catch (err: any) {
        spinner.fail(`${label} failed`);
        console.error(`Create file component content error : ${colors.bgRed(colors.white(err.message))}`);
        if (dirPath) {
            fs.rmSync(dirPath, { recursive: true, force: true });
        }
        process.exit();
    }
}