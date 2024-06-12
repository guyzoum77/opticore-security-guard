import fs from "fs";

export function checkDataSourceProviderFunction(prismaPath: string) {
    const fileContent: string = fs.readFileSync(prismaPath, 'utf8');
    const matcher: RegExp[] = [
        /provider = "mysql"/g,
        /provider = "mongodb"/g,
        /provider = "postgresql"/g,
    ];
    const foundMySQLPattern: RegExpMatchArray | null = fileContent.match(new RegExp(matcher[0]));
    const foundMongoDBLPattern: RegExpMatchArray | null = fileContent.match(new RegExp(matcher[1]));
    const foundPostgresPattern: RegExpMatchArray | null = fileContent.match(new RegExp(matcher[2]));

    return [
        {"mysql": foundMySQLPattern},
        {"mongodb": foundMongoDBLPattern},
        {"postgresql": foundPostgresPattern}
    ];
}

