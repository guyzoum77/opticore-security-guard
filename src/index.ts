#!/usr/bin/env node

import colors from "ansi-colors";
import path from "path";
import fs from "fs";
import {MessageInfoUtils} from "./utils/messageInfo.utils";
import {welcomeMessage} from "./utils/welcomeMessage";
import {createFileWithSpinnerFunction} from "./functions/createFileWithSpinner";
import {filesComponentsUtils} from "./utils/filesComponents.utils";
import {promptUserConfirmationFunction} from "./functions/promptUserConfirmation.function";
import {promptUniqueFieldFunction} from "./functions/promptUniqueField.function";
import {checkExistingModelsFunction} from "./functions/checkExistingModels.function";
import {checkDataSourceProviderFunction} from "./functions/checkDataSourceProvider.function";
import {HandleProviderUtils} from "./utils/handleProvider.utils";
import {deleteRecursivelyDirUtils} from "./utils/deleteRecursivelyDir.utils";

export async function SecurityGuard(): Promise<void> {
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
                    MessageInfoUtils.messageInfoUtils();
                    process.exit();
                } catch (err: any) {
                    console.error(`${colors.bgRed(`${colors.white(err.message)}`)}`);
                    deleteRecursivelyDirUtils();
                    process.exit();
                }
            })()
            : ((): void => {
                deleteRecursivelyDirUtils();
                process.exit();
            })();
    } else {
        const prismaPathTemplate: string = path.join(__dirname, "../dist/contents/prisma");
        const askFieldUnicity: string | void = await promptUniqueFieldFunction();
        askFieldUnicity === "email"
            ? await(async(): Promise<void> => {
                console.log(`\nYou chosen ${colors.cyan(`${askFieldUnicity}`)} as unique field in user model.\n`);
                try {
                    const tasks = filesComponentsUtils(askFieldUnicity);
                    const checkPrismaProvider = checkDataSourceProviderFunction(prismaPath);
                    for (const provider of checkPrismaProvider) {
                        if (provider.mysql && provider.mysql[0] === `provider = "mysql"`) {
                            await HandleProviderUtils.providerWithEmailAsUniqField(
                                prismaPathTemplate + "/prismaWithEmailAsUniq.txt",
                                tasks,
                                prismaPath
                            );
                        }
                        if (provider.mongodb && provider.mongodb[0] === `provider = "mongodb"`) {
                            await HandleProviderUtils.providerWithEmailAsUniqField(
                                prismaPathTemplate + "/prismaMongoModelWithEmailAsUniq.txt",
                                tasks,
                                prismaPath
                            );
                        }
                        if (provider.postgresql && provider.postgresql[0] === `provider = "postgresql"`) {
                            await HandleProviderUtils.providerWithEmailAsUniqField(
                                prismaPathTemplate + "/prismaWithEmailAsUniq.txt",
                                tasks,
                                prismaPath
                            );
                        }
                    }
                } catch (err: any) {
                    console.error(`${colors.bgRed(`${colors.white(err.message)}`)}`);
                    deleteRecursivelyDirUtils();
                    process.exit();
                }
            })()
            : await(async(): Promise<void> => {
                console.log(`You chosen ${colors.cyan(`${askFieldUnicity}`)} as unique field in user model.`);
                try {
                    const tasks = filesComponentsUtils(askFieldUnicity);
                    const checkPrismaProvider = checkDataSourceProviderFunction(prismaPath);
                    for (const provider of checkPrismaProvider) {
                        if (provider.mysql && provider.mysql![0] === `provider = "mysql"`) {
                            await HandleProviderUtils.providerWithUsernameAsUniqField(
                                prismaPathTemplate + "/prismaWithUsernameAsUniq.txt",
                                tasks,
                                prismaPath,
                                projectPath
                            );
                        }
                        if (provider.mongodb && provider.mongodb![0] === `provider = "mongodb"`) {
                            await HandleProviderUtils.providerWithUsernameAsUniqField(
                                prismaPathTemplate + "/prismaMongoModelWithUsernameAsUniq.txt",
                                tasks,
                                prismaPath,
                                projectPath
                            );
                        }
                        if (provider.postgresql && provider.postgresql![0] === `provider = "postgresql"`) {
                            await HandleProviderUtils.providerWithUsernameAsUniqField(
                                prismaPathTemplate + "/prismaWithUsernameAsUniq.txt",
                                tasks,
                                prismaPath,
                                projectPath
                            );
                        }
                    }
                } catch (err: any) {
                    console.error(`${colors.bgRed(`${colors.white(err.message)}`)}`);
                    deleteRecursivelyDirUtils();
                    process.exit(1);
                }
            })();
    }
}

(async(): Promise<void> => { await SecurityGuard(); })();