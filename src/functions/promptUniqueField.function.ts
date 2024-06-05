import {promptSelectUtils} from "../utils/promptSelect.utils";

export async function promptUniqueFieldFunction(): Promise<void | string> {
    return await promptSelectUtils(
        "Choose which field you want as unique:",
        ["email"],
        [
            { label: "Email", value: ["email"], hint: 'recommended' },
            { label: "Username", value: ["username"] },
        ]
    );
}