import fs from "fs";

export function updatePrismaSchemaFunction(dirSource: any, uniqField: any): void {
    fs.readFile(dirSource, (err: NodeJS.ErrnoException | null): void => {
        if (err) {
            console.error(err);
        }
        fs.writeFileSync(dirSource, `model User {\n` +
            `    id                         String         @id @unique @default(uuid())\n` +
            `    username                   String         ${uniqField}` === "username" ? `@unique\n` : `@db.VarChar(255)\n` +
            `    email                      String         ${uniqField}` === "email" ? `@unique\n` : `@db.VarChar(255)\n` +
                `    hashedPassword             String         @db.VarChar(255)\n` +
                `    isActive                   Boolean        @default(false)\n` +
                `    passwordChangeDate         DateTime?\n` +
                `    confirmToken               String?        @db.VarChar(255)\n` +
                `    forgetPasswordToken        String?        @db.VarChar(255)\n` +
                `    forgetPasswordTokenExpired DateTime?\n` +
                `    emailVerified              Boolean        @default(false)\n` +
                `    userComputer               String?\n` +
                `    IpAddress                  String?\n` +
                `    role                       Role\n` +
                `    salt                       String?\n` +
                `    lastConnexion              DateTime?\n` +
                `    isDeleted                  Boolean?       @default(false)\n` +
                `    auth2Fa                    Boolean?       @default(false)\n` +
                `    RefreshToken               RefreshToken[]\n` +
                `    createdAt                  DateTime       @default(now())\n` +
                `    updatedAt                  DateTime?      @updatedAt\n` +
                `}\n` +
                `\n` +
                `model RefreshToken {\n` +
                `    id           String    @id @unique @default(uuid())\n` +
                `    userId       String?\n` +
                `    hashedToken  String    @db.VarChar(255)\n` +
                `    revoked      Boolean   @default(false)\n` +
                `    expiresToken DateTime?\n` +
                `    User         User?     @relation(fields: [userId], references: [id], onDelete: Cascade)\n` +
                `    createdAt    DateTime  @default(now())\n` +
                `    updatedAt    DateTime? @updatedAt\n` +
                `}\n` +
                `\n` +
                `enum Role {\n` +
                `    USER\n` +
                `    ADMIN\n` +
                `    MANAGER\n` +
                `    SUPER_ADMIN\n` +
                `}`,
            { flag: 'a+' },
        );
    });
}