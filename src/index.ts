#!/usr/bin/env node

import clackCLI from "@clack/prompts";
import { promisify } from "util";
import cp from "child_process";
import colors from "ansi-colors";
import path from "path";
import {updatePrismaSchemaFunction} from "./functions/updatePrismaSchema.function";
import fs from "fs";
import {messageInfoUtils} from "./utils/messageInfo.utils";
import {welcomeMessage} from "./utils/welcomeMessage";
import {createFileWithSpinnerFunction} from "./functions/createFileWithSpinner";
import {filesComponentsUtils} from "./utils/filesComponents.utils";
import {promptUserConfirmationFunction} from "./functions/promptUserConfirmation.function";
import {promptUniqueFieldFunction} from "./functions/promptUniqueField.function";
import {checkExistingModelsFunction} from "./functions/checkExistingModels.function";

export async function SecurityGuard(): Promise<void> {
    const exec = promisify(cp.exec);
    welcomeMessage();

    const currentPath: string = process.cwd();
    const projectPath: string = path.join(currentPath);
    const prismaPath: string = projectPath + "/prisma/schema.prisma";

    if (fs.existsSync(prismaPath) && (await checkExistingModelsFunction(prismaPath))) {
        let confirmAction: void | string = await promptUserConfirmationFunction();
        typeof confirmAction === "string" && confirmAction === "yes"
            ? await (async(): Promise<void> => {
                const tasks = filesComponentsUtils(confirmAction);
                try {
                    for (const task of tasks) {
                        await createFileWithSpinnerFunction(task);
                    }
                    messageInfoUtils();
                    process.exit();
                } catch (err: any) {
                    console.error(`${colors.bgRed(`${colors.white(err.message)}`)}`);
                    process.exit();
                }
            })()
            : ((): void => { process.exit(); })();
    } else {
        const prismaPathTemplate: string = path.join(__dirname, "../dist/contents/prisma");
        const askFieldUnicity: string | void = await promptUniqueFieldFunction();
        askFieldUnicity === "email"
            ? await(async(): Promise<void> => {
                console.log(`\nYou chosen ${colors.cyan(`${askFieldUnicity}`)} as unique field in user model.\n`);
                try {
                    const tasks = filesComponentsUtils(askFieldUnicity);
                    updatePrismaSchemaFunction(prismaPath, prismaPathTemplate + "/prismaWithEmailAsUniq.txt");
                    for (const task of tasks) {
                        await createFileWithSpinnerFunction(task);
                    }
                    messageInfoUtils();
                    process.exit();
                } catch (err: any) {
                    console.error(`${colors.bgRed(`${colors.white(err.message)}`)}`);
                    process.exit();
                }
            })()
            : await(async(): Promise<void> => {
                console.log(`You chosen ${colors.cyan(`${askFieldUnicity}`)} as unique field in user model.`);
                try {
                    const tasks = filesComponentsUtils(askFieldUnicity);
                    updatePrismaSchemaFunction(prismaPath, prismaPathTemplate + "/prismaWithUsernameAsUniq.txt");
                    await exec(`npx prisma generate`, {cwd: projectPath});
                    for (const task of tasks) {
                        await createFileWithSpinnerFunction(task);
                    }
                    messageInfoUtils();
                } catch (err: any) {
                    console.error(`${colors.bgRed(`${colors.white(err.message)}`)}`);
                    process.exit(1);
                }
            })();
    }
}

(async(): Promise<void> => { await SecurityGuard(); })();