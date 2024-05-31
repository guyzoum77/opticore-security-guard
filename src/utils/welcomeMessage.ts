import gradient from "gradient-string";

export function welcomeMessage(): void {
    return  console.log(gradient('cyan', 'pink', 'orange')('╭─────────────────────────────────────────────────╮\n' +
        '│                                                 │\n' +
        '│       Welcome to Auth Guard Component CLI       │\n' +
        '│                                                 │\n' +
        '╰─────────────────────────────────────────────────╯\n'));
}

