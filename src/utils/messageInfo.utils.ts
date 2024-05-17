import colors from "ansi-colors";
import path from "path";

export function messageInfoUtils(createdRessource: any, userValidatorPath: string, userContractPath: string,
                                 userRepositoryPath: string, userInterfacePath: string, userRoleEnumsPath: string,
                                 userUseCasesPath: string) {
    console.log(`${colors.cyan(`Updated:`)} ${path.join(__dirname, "../prisma/schema.prisma")}`);
    console.log(`${colors.cyan(`Created:`)} ${createdRessource}/${userValidatorPath}/user.validator.ts`);
    console.log(`${colors.cyan(`Created:`)} ${createdRessource}/${userContractPath}/user.contract.ts`);
    console.log(`${colors.cyan(`Created:`)} ${createdRessource}/${userRepositoryPath}/user.repository.ts`);
    console.log(`${colors.cyan(`Created:`)} ${createdRessource}/${userInterfacePath}/refreshToken.interface.ts`);
    console.log(`${colors.cyan(`Created:`)} ${createdRessource}/${userInterfacePath}/user.interface.ts`);
    console.log(`${colors.cyan(`Created:`)} ${createdRessource}/${userRoleEnumsPath}/role.enum.ts`);
    console.log(`${colors.cyan(`Created:`)} ${createdRessource}/${userUseCasesPath}/fetchUserByConfirmEmailToken.usecase.ts`);
    console.log(`${colors.cyan(`Created:`)} ${createdRessource}/${userUseCasesPath}/fetchUserByEmail.usecase.ts`);
    console.log(`${colors.cyan(`Created:`)} ${createdRessource}/${userUseCasesPath}/fetchUserByForgetPasswordToken.usecase.ts`);
    console.log(`${colors.cyan(`Created:`)} ${createdRessource}/${userUseCasesPath}/fetchUserById.usecase.ts`);
    console.log(`${colors.cyan(`Created:`)} ${createdRessource}/${userUseCasesPath}/fetchUserByUsername.usecase.ts`);
    console.log(`${colors.cyan(`Created:`)} ${createdRessource}/${userUseCasesPath}/fetchUserWithRefreshTokenByUserId.usecase.ts`);

    console.log(`${colors.bgCyan(`${colors.white(`What's next ?`)}`)}\n`);
    console.log(`If you need a middleware to authenticate user before any resource request.`);
    console.log(`Then, you can use this command : ${colors.cyan(`npm run opticore:make-authentication`)}`);
}