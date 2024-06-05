import path from "path";
import fs from "fs";
import colors from "ansi-colors";
import {generateTasksUtils} from "./generateTasks.utils";

export function filesComponentsUtils(askFieldUnicity: void | string) {
    const fileContent: string = fs.readFileSync(path.join(process.cwd()) + "/prisma/schema.prisma", 'utf8');
    let filePath: string = path.join(__dirname, "../dist/contents");

    let usernameAsUniqFieldFound: boolean = false;
    let emailAsUniqFieldFound: boolean = false;
    if (fileContent.match(/username\s+String\s+@unique/)) {
        usernameAsUniqFieldFound = true;
    }
    if (fileContent.match(/email\s+String\s+@unique/)) {
        emailAsUniqFieldFound = true;
    }

    if(!fs.existsSync(filePath)) {
        console.error(colors.bgRed(colors.white(`Error: ENOENT: no such file or directory. Try to contact the support to report them this bug.`)));
        console.log(`Bugs supports : ${`https://github.com/guyzoum77/opticore-user-authenticate-component/issues`}`);
        process.exit();
    } else {
        if (askFieldUnicity === "email") {
            return generateTasksUtils(`${filePath}/validators/userEmailAsUniqField.validator.txt`);
        }
        if (usernameAsUniqFieldFound && !emailAsUniqFieldFound) {
            return generateTasksUtils(`${filePath}/validators/userUsernameAsUniqField.validator.txt`);
        }
        if (emailAsUniqFieldFound && !usernameAsUniqFieldFound) {
            return generateTasksUtils(`${filePath}/validators/userEmailAsUniqField.validator.txt`);
        }
        
        return generateTasksUtils(askFieldUnicity === 'email'
            ? `${filePath}/validators/userEmailAsUniqField.validator.txt`
            : `${filePath}/validators/userUsernameAsUniqField.validator.txt`);
    }
}