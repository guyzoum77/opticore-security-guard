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

export async function SecurityGuard(): Promise<void> {
    let ora = (await import("ora")).default;
    const exec = promisify(cp.exec);

    const currentPath: string = process.cwd();
    const projectPath: string = path.join(currentPath);

    let fileContent: string = fs.readFileSync(path.join(process.cwd())+"/prisma/schema.prisma", 'utf8');
    const userModelFound: RegExpMatchArray | null = fileContent.match(/model User/g);
    const refreshTokenModelFound: RegExpMatchArray | null = fileContent.match(/model RefreshToken/g);
    const roleEnumFound: RegExpMatchArray | null = fileContent.match(/enum Role/g);

    if (fs.existsSync(path.join(process.cwd())+"/prisma/schema.prisma")
        && (userModelFound && refreshTokenModelFound && roleEnumFound)) {
        const processInstallation: symbol | string[] = await clackCLI.select({
            message: "We notice that you already have the model user, " +
                "refreshToken and enum role, so we ask you to confirm if you want to continue" +
                " the installation in order to set up the security guard system :",
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

    }
    else {
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
        const prismaPath: string = path.join(__dirname, "../dist/contents/prisma");

        // verify if model exist
        if (askFieldUnicity[0] === "email") {
            console.log(`\nYou chosen ${colors.cyan(`${askFieldUnicity[0]}`)} as unique field in user model.\n`);
            try {
                updatePrismaSchemaFunction(projectPath+"/prisma/schema.prisma", prismaPath+"/prismaWithEmailAsUniq.txt");
                await exec(`npx prisma generate`, { cwd: projectPath });
            } catch (err: any) {
                console.error(`${colors.bgRed(`${colors.white(err.message)}`)}`);
                process.exit(1);
            }
        } else {
            console.log(`You chosen ${colors.cyan(`${askFieldUnicity[0]}`)} as unique field in user model.`);
            try {
                updatePrismaSchemaFunction(projectPath+"/prisma/schema.prisma", prismaPath+"/prismaWithUsernameAsUniq.txt");
                await exec(`npx prisma generate`, { cwd: projectPath });
            } catch (err: any) {
                console.error(`${colors.bgRed(`${colors.white(err.message)}`)}`);
                process.exit(1);
            }
        }
    }

    const filePath: string = path.join(__dirname, "../dist/contents");

    const userValidatorPath: string  = currentPath + "/src/application/validators";
    const userContractPath: string   = currentPath + "/src/persistence/contracts";
    const userRepositoryPath: string = currentPath + "/src/persistence/repositories";
    const userInterfacePath: string  = currentPath + "/src/application/interfaces";
    const userRoleEnumsPath: string  = currentPath + "/src/domain/enums";
    const userUseCasesPath: string   = currentPath + "/src/persistence/usecases";

    if (!fs.existsSync(userValidatorPath)) {
        fs.mkdirSync(userValidatorPath);
    }if (!fs.existsSync(userContractPath)) {
        fs.mkdirSync(userContractPath);
    } if (!fs.existsSync(userRepositoryPath)) {
        fs.mkdirSync(userRepositoryPath);
    } if (!fs.existsSync(userInterfacePath)) {
        fs.mkdirSync(userInterfacePath);
    } if (!fs.existsSync(userRoleEnumsPath)) {
        fs.mkdirSync(userRoleEnumsPath);
    } if (!fs.existsSync(userUseCasesPath)) {
        fs.mkdirSync(userUseCasesPath);
    }

    // create validator
    if (fs.existsSync(userValidatorPath + "/user.validator.ts")) {
        console.log(`${colors.bgCyan(`${colors.white(`user.validator.ts is already exist`)}`)}\n`);
        process.exit();
    } else {
        const validatorSpinner = ora("The creation of user validator is processing").start();
        createFileFunction(
            userValidatorPath + "/user.validator.ts",
            filePath + "/validators/user.validator.txt"
        );
        validatorSpinner.succeed("User validator is done");
    }


    // create contract
    if (fs.existsSync(userContractPath + "/user.contract.ts")) {
        console.log(`${colors.bgCyan(`${colors.white(`user.contract.ts is already exist`)}`)}\n`);
        process.exit();
    } else {
        const contractSpinner = ora("The creation of user contract is processing").start();
        createFileFunction(
            userContractPath + "/user.contract.ts",
            filePath + "/contracts/user.contract.txt"
        );
        contractSpinner.succeed("User contract is done");
    }

    // create repository
    if (fs.existsSync(userRepositoryPath + "/user.repository.ts")) {
        console.log(`${colors.bgCyan(`${colors.white(`user.repository.ts is already exist`)}`)}\n`);
        process.exit();
    } else {
        const repositorySpinner = ora("The creation of user repository is processing").start();
        createFileFunction(
            userRepositoryPath + "/user.repository.ts",
            filePath + "/repositories/user.repository.txt"
        );
        repositorySpinner.succeed("User repository is done");
    }

    // create refreshToken interface
    if (fs.existsSync(userInterfacePath + "/refreshToken.interface.ts")) {
        console.log(`${colors.bgCyan(`${colors.white(`refreshToken.interface.ts is already exist`)}`)}\n`);
        process.exit();
    } else {
        const refreshTokenInterfaceSpinner = ora("The creation of refreshToken interface is processing").start();
        createFileFunction(
            userInterfacePath + "/refreshToken.interface.ts",
            filePath + "/interfaces/refreshToken.interface.txt"
        );
        refreshTokenInterfaceSpinner.succeed("RefreshToken interface is done");
    }

    // create user interface
    if (fs.existsSync(userInterfacePath + "/user.interface.ts")) {
        console.log(`${colors.bgCyan(`${colors.white(`user.interface.ts is already exist`)}`)}\n`);
        process.exit();
    } else {
        const userInterfaceSpinner = ora("The creation of user interface is processing").start();
        createFileFunction(
            userInterfacePath + "/user.interface.ts",
            filePath + "/interfaces/user.interface.txt"
        );
        userInterfaceSpinner.succeed("User interface is done");
    }

    // create role enum
    if (fs.existsSync(userRoleEnumsPath + "/role.enum.ts")) {
        console.log(`${colors.bgCyan(`${colors.white(`role.enum.ts is already exist`)}`)}\n`);
        process.exit();
    } else {
        const userRoleEnumsSpinner = ora("The creation of user role enum is processing").start();
        createFileFunction(
            userRoleEnumsPath + "/role.enum.ts",
            filePath + "/enums/role.enum.txt"
        );
        userRoleEnumsSpinner.succeed("User role enum is done");
    }

    // create usecases fetchUserByConfirmEmailToken
    if (fs.existsSync(userUseCasesPath + "/fetchUserByConfirmEmailToken.usecase.ts")) {
        console.log(`${colors.bgCyan(`${colors.white(`fetchUserByConfirmEmailToken.usecase.ts is already exist`)}`)}\n`);
        process.exit();
    } else {
        const fetchUserByConfirmEmailTokenSpinner = ora("The creation of usecase fetchUserByConfirmEmailToken is processing").start();
        createFileFunction(
            userUseCasesPath + "/fetchUserByConfirmEmailToken.usecase.ts",
            filePath + "/usecases/fetchUserByConfirmEmailToken.usecase.txt"
        );
        fetchUserByConfirmEmailTokenSpinner.succeed("Usecase fetchUserByConfirmEmailToken is done");
    }

    // create usecases fetchUserByEmail
    if (fs.existsSync(userUseCasesPath + "/fetchUserByEmail.usecase.ts")) {
        console.log(`${colors.bgCyan(`${colors.white(`fetchUserByEmail.usecase.ts is already exist`)}`)}\n`);
        process.exit();
    } else {
        const fetchUserByEmailSpinner = ora("The creation of usecase fetchUserByEmail is processing").start();
        createFileFunction(
            userUseCasesPath + "/fetchUserByEmail.usecase.ts",
            filePath + "/usecases/fetchUserByEmail.usecase.txt"
        );
        fetchUserByEmailSpinner.succeed("Usecase fetchUserByEmail is done");
    }

    // create usecases fetchUserByForgetPasswordToken
    if (fs.existsSync(userUseCasesPath + "/fetchUserByForgetPasswordToken.usecase.ts")) {
        console.log(`${colors.bgCyan(`${colors.white(`fetchUserByForgetPasswordToken.usecase.ts is already exist`)}`)}\n`);
        process.exit();
    } else {
        const fetchUserByForgetPasswordTokenSpinner = ora("The creation of usecase fetchUserByForgetPasswordToken is processing").start();
        createFileFunction(
            userUseCasesPath + "/fetchUserByForgetPasswordToken.usecase.ts",
            filePath + "/usecases/fetchUserByForgetPasswordToken.usecase.txt"
        );
        fetchUserByForgetPasswordTokenSpinner.succeed("Usecase fetchUserByForgetPasswordToken is done");
    }

    // create usecases fetchUserById
    if (fs.existsSync(userUseCasesPath + "/fetchUserById.usecase.ts")) {
        console.log(`${colors.bgCyan(`${colors.white(`fetchUserById.usecase.ts is already exist`)}`)}\n`);
        process.exit();
    } else {
        const fetchUserByIdEmailSpinner = ora("The creation of usecase fetchUserById is processing").start();
        createFileFunction(
            userUseCasesPath + "/fetchUserById.usecase.ts",
            filePath + "/usecases/fetchUserById.usecase.txt"
        );
        fetchUserByIdEmailSpinner.succeed("Usecase fetchUserById is done");
    }

    // create usecases fetchUserByUsername
    if (fs.existsSync(userUseCasesPath + "/fetchUserByUsername.usecase.ts")) {
        console.log(`${colors.bgCyan(`${colors.white(`fetchUserByUsername.usecase.ts is already exist`)}`)}\n`);
        process.exit();
    } else {
        const fetchUserByUsernameSpinner = ora("The creation of usecase fetchUserByUsername is processing").start();
        createFileFunction(
            userUseCasesPath + "/fetchUserByUsername.usecase.ts",
            filePath + "/usecases/fetchUserByUsername.usecase.txt"
        );
        fetchUserByUsernameSpinner.succeed("Usecase fetchUserByUsername is done");
    }

    // create usecases fetchUserWithRefreshTokenByUserId
    if (fs.existsSync(userUseCasesPath + "/fetchUserWithRefreshTokenByUserId.usecase.ts")) {
        console.log(`${colors.bgCyan(`${colors.white(`fetchUserWithRefreshTokenByUserId.usecase.ts is already exist`)}`)}\n`);
        process.exit();
    } else {
        const fetchUserWithRefreshTokenByUserIdSpinner = ora("The creation of usecase fetchUserWithRefreshTokenByUserId is processing").start();
        createFileFunction(
            userUseCasesPath + "/fetchUserWithRefreshTokenByUserId.usecase.ts",
            filePath + "/usecases/fetchUserWithRefreshTokenByUserId.usecase.txt"
        );
        fetchUserWithRefreshTokenByUserIdSpinner.succeed("Usecase fetchUserWithRefreshTokenByUserId is done");
    }

    messageInfoUtils();
    process.exit();
}

(async(): Promise<void> => { await SecurityGuard(); })();