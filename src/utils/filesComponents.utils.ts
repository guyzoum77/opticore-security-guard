import path from "path";

export function filesComponentsUtils(askFieldUnicity: string) {
    const currentPath: string = process.cwd();

    let filePath: string = path.join(__dirname, "../dist/contents");
    let userValidatorPath: string  = currentPath + "/src/application/validators";
    let userContractPath: string   = currentPath + "/src/persistence/contracts";
    let userRepositoryPath: string = currentPath + "/src/persistence/repositories";
    let userInterfacePath: string  = currentPath + "/src/application/interfaces";
    let userRoleEnumsPath: string  = currentPath + "/src/domain/enums";
    let userUseCasesPath: string   = currentPath + "/src/persistence/usecases";

    return [
        {
            path: `${userValidatorPath}/user.validator.ts`,
            template: askFieldUnicity === "email"
                ? `${filePath}/validators/userEmailAsUniqField.validator.txt`
                : `${filePath}/validators/userUsernameAsUniqField.validator.txt`,
            label: 'User validator'
        },
        {
            path: `${userContractPath}/user.contract.ts`,
            template: `${filePath}/contracts/user.contract.txt`,
            label: 'User contract'
        },
        {
            path: `${userRepositoryPath}/user.repository.ts`,
            template: `${filePath}/repositories/user.repository.txt`,
            label: 'User repository'
        },
        {
            path: `${userInterfacePath}/refreshToken.interface.ts`,
            template: `${filePath}/interfaces/refreshToken.interface.txt`,
            label: 'RefreshToken interface'
        },
        {
            path: `${userInterfacePath}/user.interface.ts`,
            template: `${filePath}/interfaces/user.interface.txt`,
            label: 'User interface'
        },
        {
            path: `${userRoleEnumsPath}/role.enum.ts`,
            template: `${filePath}/enums/role.enum.txt`,
            label: 'User role enum'
        },
        {
            path: `${userUseCasesPath}/fetchUserByConfirmEmailToken.usecase.ts`,
            template: `${filePath}/usecases/fetchUserByConfirmEmailToken.usecase.txt`,
            label: 'Usecase fetchUserByConfirmEmailToken'
        },
        {
            path: `${userUseCasesPath}/fetchUserByEmail.usecase.ts`,
            template: `${filePath}/usecases/fetchUserByEmail.usecase.txt`,
            label: 'Usecase fetchUserByEmail'
        },
        {
            path: `${userUseCasesPath}/fetchUserByForgetPasswordToken.usecase.ts`,
            template: `${filePath}/usecases/fetchUserByForgetPasswordToken.usecase.txt`,
            label: 'Usecase fetchUserByForgetPasswordToken'
        },
        {
            path: `${userUseCasesPath}/fetchUserById.usecase.ts`,
            template: `${filePath}/usecases/fetchUserById.usecase.txt`,
            label: 'Usecase fetchUserById'
        },
        {
            path: `${userUseCasesPath}/fetchUserByUsername.usecase.ts`,
            template: `${filePath}/usecases/fetchUserByUsername.usecase.txt`,
            label: 'Usecase fetchUserByUsername'
        },
        {
            path: `${userUseCasesPath}/fetchUserWithRefreshTokenByUserId.usecase.ts`,
            template: `${filePath}/usecases/fetchUserWithRefreshTokenByUserId.usecase.txt`,
            label: 'Usecase fetchUserWithRefreshTokenByUserId'
        }
    ];
}