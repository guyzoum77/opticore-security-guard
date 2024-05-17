import {defineConfig} from "tsup";
export default defineConfig({
    name: "opticore-user-component",
    format: ["cjs", "esm"],
    entry: ['src/index.ts'] ,
    dts: true,
    shims: true,
    skipNodeModulesBundle: true,
    clean: true
});