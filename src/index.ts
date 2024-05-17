#!/usr/bin/env node

import clackCLI from "@clack/prompts";
import { promisify } from "util";
import cp from "child_process";
import colors from "ansi-colors";
import path from "path";
import {updatePrismaSchemaFunction} from "./functions/updatePrismaSchema.function";
import fs from "fs";
import {createFileFunction} from "./functions/createFile.function";
import {messageInfoUtils} from "./utils/messageInfo.utils";

export async function SecurityGuard() {
    let ora = (await import("ora")).default;
    const exec = promisify(cp.exec);

    const currentPath: string = process.cwd();
    const projectPath: string = path.join(currentPath);

    const askFieldUnicity = await clackCLI.select({
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
    if (askFieldUnicity[0]) {
        try {
            updatePrismaSchemaFunction(projectPath, askFieldUnicity[0]);
            await exec(`npx prisma generate`, { cwd: projectPath });
        } catch (err: any) {
            console.error(`${colors.bgRed(`${colors.white(err.message)}`)}`);
            process.exit(1);
        }

        const filePath: string = path.join(__dirname, "../dist/contents");

        const userValidatorPath: string  = currentPath + "/application/validators";
        const userContractPath: string   = currentPath + "/persistence/contracts";
        const userRepositoryPath: string = currentPath + "/persistence/repositories";
        const userInterfacePath: string  = currentPath + "/application/interfaces";
        const userRoleEnumsPath: string  = currentPath + "/domain/enums";
        const userUseCasesPath: string   = currentPath + "/persistence/usecases";

        // create validator
        const validatorSpinner = ora("The creation of user validator is processing").start();
        createFileFunction(
            userValidatorPath + "/user.validator.ts",
            filePath + "/validators/user.validator.txt"
        );
        validatorSpinner.succeed("User validator is done");

        // create contract
        const contractSpinner = ora("The creation of user contract is processing").start();
        createFileFunction(
            userContractPath + "/user.contract.ts",
            filePath + "/contracts/user.contract.txt"
        );
        contractSpinner.succeed("User contract is done");

        // create repository
        const repositorySpinner = ora("The creation of user repository is processing").start();
        createFileFunction(
            userRepositoryPath + "/user.repository.ts",
            filePath + "/repositories/user.repository.txt"
        );
        repositorySpinner.succeed("User repository is done");

        // create refreshToken interface
        const refreshTokenInterfaceSpinner = ora("The creation of refreshToken interface is processing").start();
        createFileFunction(
            userInterfacePath + "/refreshToken.interface.ts",
            filePath + "/interfaces/refreshToken.interface.txt"
        );
        refreshTokenInterfaceSpinner.succeed("RefreshToken interface is done")

        // create user interface
        const userInterfaceSpinner = ora("The creation of user interface is processing").start();
        createFileFunction(
            userInterfacePath + "/user.interface.ts",
            filePath + "/interfaces/user.interface.txt"
        );
        userInterfaceSpinner.succeed("User interface is done");

        // create role enum
        const userRoleEnumsSpinner = ora("The creation of user role enum is processing").start();
        createFileFunction(
            userRoleEnumsPath + "/role.enum.ts",
            filePath + "/enums/role.enum.txt"
        );
        userRoleEnumsSpinner.succeed("User role enum is done");

        // create usecases fetchUserByConfirmEmailToken
        const fetchUserByConfirmEmailTokenSpinner = ora("The creation of usecase fetchUserByConfirmEmailToken is processing").start();
        createFileFunction(
            userUseCasesPath + "/fetchUserByConfirmEmailToken.usecase.ts",
            filePath + "/usecases/fetchUserByConfirmEmailToken.usecase.txt"
        );
        fetchUserByConfirmEmailTokenSpinner.succeed("Usecase fetchUserByConfirmEmailToken is done");

        // create usecases fetchUserByEmail
        const fetchUserByEmailSpinner = ora("The creation of usecase fetchUserByEmail is processing").start();
        createFileFunction(
            userUseCasesPath + "/fetchUserByEmail.usecase.ts",
            filePath + "/usecases/fetchUserByEmail.usecase.txt"
        );
        fetchUserByEmailSpinner.succeed("Usecase fetchUserByEmail is done");

        // create usecases fetchUserByForgetPasswordToken
        const fetchUserByForgetPasswordTokenSpinner = ora("The creation of usecase fetchUserByForgetPasswordToken is processing").start();
        createFileFunction(
            userUseCasesPath + "/fetchUserByForgetPasswordToken.usecase.ts",
            filePath + "/usecases/fetchUserByForgetPasswordToken.usecase.txt"
        );
        fetchUserByForgetPasswordTokenSpinner.succeed("Usecase fetchUserByForgetPasswordToken is done");

        // create usecases fetchUserById
        const fetchUserByIdEmailSpinner = ora("The creation of usecase fetchUserById is processing").start();
        createFileFunction(
            userUseCasesPath + "/fetchUserById.usecase.ts",
            filePath + "/usecases/fetchUserById.usecase.txt"
        );
        fetchUserByIdEmailSpinner.succeed("Usecase fetchUserById is done");

        // create usecases fetchUserByUsername
        const fetchUserByUsernameSpinner = ora("The creation of usecase fetchUserByUsername is processing").start();
        createFileFunction(
            userUseCasesPath + "/fetchUserByUsername.usecase.ts",
            filePath + "/usecases/fetchUserByUsername.usecase.txt"
        );
        fetchUserByUsernameSpinner.succeed("Usecase fetchUserByUsername is done");

        // create usecases fetchUserWithRefreshTokenByUserId
        const fetchUserWithRefreshTokenByUserIdSpinner = ora("The creation of usecase fetchUserWithRefreshTokenByUserId is processing").start();
        createFileFunction(
            userUseCasesPath + "/fetchUserWithRefreshTokenByUserId.usecase.ts",
            filePath + "/usecases/fetchUserWithRefreshTokenByUserId.usecase.txt"
        );
        fetchUserWithRefreshTokenByUserIdSpinner.succeed("Usecase fetchUserWithRefreshTokenByUserId is done");

        const createdRessource: string = path.join(__dirname, "../src");
        messageInfoUtils(createdRessource, userValidatorPath, userContractPath, userRepositoryPath,
            userInterfacePath, userRoleEnumsPath, userUseCasesPath);

        process.exit();
    }
}

(async(): Promise<void> => { await SecurityGuard(); })();