import rust from "@wasm-tool/rollup-plugin-rust"
import svelte from "rollup-plugin-svelte"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import pkg from "./package.json"
import commonjs from "@rollup/plugin-commonjs"
import css from "rollup-plugin-css-only"
// import livereload from "rollup-plugin-livereload"
import typescript from "@rollup/plugin-typescript"
import sveltePreprocess from "svelte-preprocess"

// import nodePolyfills from 'rollup-plugin-node-polyfills'
const inlineDynamicImports = true

const name = pkg.name
    .replace(/^(@\S+\/)?(svelte-)?(\S+)/, "$3")
    .replace(/^\w/, (m) => m.toUpperCase())
    .replace(/-\w/g, (m) => m[1].toUpperCase())
const production = !process.env.ROLLUP_WATCH

function serve() {
    let server

    function toExit() {
        if (server) server.kill(0)
    }

    return {
        writeBundle() {
            if (server) return
            server = require("child_process").spawn(
                "npm",
                ["run", "start", "--", "--dev"],
                {
                    stdio: ["ignore", "inherit", "inherit"],
                    shell: true,
                }
            )

            process.on("SIGTERM", toExit)
            process.on("exit", toExit)
        },
    }
}

export default [
    {
        input: "src/index.js",
        output: [
            { file: pkg.module, format: "es", inlineDynamicImports },
            { file: pkg.main, format: "umd", name, inlineDynamicImports },
        ],
        plugins: [
            rust({
                inlineWasm: true, // slower, 33% bigger, but built into the javascript code
                serverPath: "/build/",
                debug: false, // release mode, takes long but it smaller
            }),
            typescript({ sourceMap: !production }),
            nodeResolve({
                browser: true,
                preferBuiltins: false,
            }),
            commonjs(),
            // nodePolyfills({ buffer: true }),
            svelte({
                compilerOptions: {
                    // enable run-time checks when not in production
                    dev: !production,
                },
                preprocess: sveltePreprocess(), // for the typescript
            }),
            css({ output: "bundle.css" }),
        ],
    },
    // {
    //     input: "src/main.js",
    //     output: {
    //         sourcemap: true,
    //         format: "iife",
    //         name: "app",
    //         file: "public/build/bundle.js",
    //         inlineDynamicImports,
    //     },
    //     plugins: [
    //         rust({
    //             inlineWasm: true, // slower, 33% bigger, but built into the javascript code
    //             serverPath: "/build/",
    //         }),
    //         typescript({ sourceMap: !production }),
    //         nodeResolve({
    //             browser: true,
    //             preferBuiltins: false,
    //         }),
    //         commonjs(),
    //         // nodePolyfills({ buffer: true }),
    //         svelte({
    //             compilerOptions: {
    //                 // enable run-time checks when not in production
    //                 dev: !production,
    //             },
    //             preprocess: sveltePreprocess(),
    //         }),
    //         css({ output: "bundle.css" }),

    //         !production && serve(),
    //         !production && livereload("public"),
    //     ],
    // },
]
