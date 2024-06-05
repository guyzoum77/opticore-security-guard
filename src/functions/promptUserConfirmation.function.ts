import {promptSelectUtils} from "../utils/promptSelect.utils";

export async function promptUserConfirmationFunction(): Promise<void | string> {
    return await promptSelectUtils(
        "We notice that you already have the model user, refreshToken and enum role, so we ask you to confirm " +
        "\nif you want to continue the installation in order to set up the security guard system:",
        ["yes"],
        [
            {label: "Yes, I want it", value: ["yes"], hint: 'recommended'},
            {label: "No", value: ["no"]},
        ]
    );
}