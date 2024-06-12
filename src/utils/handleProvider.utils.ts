import {updatePrismaSchemaFunction} from "../functions/updatePrismaSchema.function";
import {MessageInfoUtils} from "./messageInfo.utils";
import {createFileWithSpinnerFunction} from "../functions/createFileWithSpinner";
import { promisify } from "util";
import cp from "child_process";

export class HandleProviderUtils {
    static async providerWithEmailAsUniqField(templatePath: string, tasks: any, prismaPath: string): Promise<void> {
        updatePrismaSchemaFunction(prismaPath, templatePath);
        for (const task of tasks) {
            await createFileWithSpinnerFunction(task);
        }
        MessageInfoUtils.messageInfoUpdatePrismaSchemaUtils();
        process.exit();
    }

    static async providerWithUsernameAsUniqField (templatePath: string, tasks: any, prismaPath: string, projectPath: string): Promise<void> {
        const exec = promisify(cp.exec);
        updatePrismaSchemaFunction(prismaPath, templatePath);
        await exec(`npx prisma generate`, { cwd: projectPath });
        for (const task of tasks) {
            await createFileWithSpinnerFunction(task);
        }
        MessageInfoUtils.messageInfoUpdatePrismaSchemaUtils();
    }
}