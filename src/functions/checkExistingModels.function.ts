import fs from "fs";

export async function checkExistingModelsFunction(prismaPath: string): Promise<boolean> {
    const fileContent: string = fs.readFileSync(prismaPath, 'utf8');
    const matcher: RegExp[] = [
        /model User/g,
        /model RefreshToken/g,
        /enum Role/g,
    ];
    const existModels: (RegExpMatchArray | null)[] = matcher.map((item: RegExp) => {
        return fileContent.match(item);
    });
    return existModels.every((model: RegExpMatchArray | null): boolean => model !== null);
}