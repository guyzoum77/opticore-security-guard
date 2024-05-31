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

export async function SecurityGuard(): Promise<void> {
    const exec = promisify(cp.exec);
    welcomeMessage();

    const currentPath: string = process.cwd();
    const projectPath: string = path.join(currentPath);
    const prismaPath: string = projectPath+"/prisma/schema.prisma";

    let fileContent: string = fs.readFileSync(path.join(process.cwd())+"/prisma/schema.prisma", 'utf8');

    const userModelFound: RegExpMatchArray | null = fileContent.match(/model User/g);
    const refreshTokenModelFound: RegExpMatchArray | null = fileContent.match(/model RefreshToken/g);
    const roleEnumFound: RegExpMatchArray | null = fileContent.match(/enum Role/g);

    if (fs.existsSync(prismaPath) && (userModelFound && refreshTokenModelFound && roleEnumFound)) {
        const processInstallation: symbol | string[] = await clackCLI.select({
            message: "We notice that you already have the model user, refreshToken and enum role, so we ask you to confirm " +
                "\nif you want to continue the installation in order to set up the security guard system :",
            initialValue: ["yes"],
            options: [
                { label: "Yes, i want it", value: ["yes"], hint: 'recommended' },
                { label: "No", value: ["no"] },
            ]
        });
        if (clackCLI.isCancel(processInstallation)) {
            console.log(`${colors.bgRed(`${colors.white('Operation cancelled.')}`)}`);
            process.exit(0);
        }
        if (processInstallation[0] === "yes") {
            const tasks = filesComponentsUtils(processInstallation[0]);
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
        }
    }

    const askFieldUnicity: symbol | string[] = await clackCLI.select({
        message: "Choose which field do you want as unique :",
        initialValue: ["email"],
        options: [
            { label: "Email", value: ["email"], hint: 'recommended' },
            { label: "username", value: ["username"] },
        ]
    });
    if (clackCLI.isCancel(askFieldUnicity)) {
        console.log(`${colors.bgRed(`${colors.white('Operation cancelled.')}`)}`);
        process.exit(0);
    }
    const prismaPathTemplate: string = path.join(__dirname, "../dist/contents/prisma");
    if (askFieldUnicity[0] === "email") {
        console.log(`\nYou chosen ${colors.cyan(`${askFieldUnicity[0]}`)} as unique field in user model.\n`);
        try {
            updatePrismaSchemaFunction(prismaPath, prismaPathTemplate+"/prismaWithEmailAsUniq.txt");
            await exec(`npx prisma generate`, { cwd: projectPath });
        } catch (err: any) {
            console.error(`${colors.bgRed(`${colors.white(err.message)}`)}`);
            process.exit(1);
        }
    } else {
        console.log(`You chosen ${colors.cyan(`${askFieldUnicity[0]}`)} as unique field in user model.`);
        try {
            const tasks = filesComponentsUtils(askFieldUnicity[0]);
            updatePrismaSchemaFunction(prismaPath, prismaPathTemplate+"/prismaWithUsernameAsUniq.txt");
            await exec(`npx prisma generate`, { cwd: projectPath });
            for (const task of tasks) {
                await createFileWithSpinnerFunction(task);
            }
            messageInfoUtils();
        } catch (err: any) {
            console.error(`${colors.bgRed(`${colors.white(err.message)}`)}`);
            process.exit(1);
        }
    }
}

(async(): Promise<void> => { await SecurityGuard(); })();