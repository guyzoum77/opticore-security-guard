import fs from "fs";
import path from "path";

export function deleteRecursivelyDirUtils(): void {
    fs.rmSync(path.join(process.cwd()) + "/src/application/interfaces", { recursive: true, force: true });
    fs.rmSync(path.join(process.cwd()) + "/src/application/validators", { recursive: true, force: true });
    fs.rmSync(path.join(process.cwd()) + "/src/domain/enums", { recursive: true, force: true });
    fs.rmSync(path.join(process.cwd()) + "/src/persistence/contracts", { recursive: true, force: true });
    fs.rmSync(path.join(process.cwd()) + "/src/persistence/repositories", { recursive: true, force: true });
    fs.rmSync(path.join(process.cwd()) + "/src/persistence/usecases", { recursive: true, force: true });
}