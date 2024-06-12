import clackCLI from "@clack/prompts";
import colors from "ansi-colors";
import {deleteRecursivelyDirUtils} from "./deleteRecursivelyDir.utils";

export async function promptSelectUtils(message: string, initialValue: string[], options: any): Promise<void | string> {
    const action: symbol | string[] = await clackCLI.select({
        message: message,
        initialValue: initialValue,
        options: options
    });

    return (clackCLI.isCancel(action))
        ? ((): void => {
            console.log(`${colors.bgRed(`${colors.white('Operation cancelled.')}`)}`);
            deleteRecursivelyDirUtils();
            process.exit();
        })()
        : action[0];
}