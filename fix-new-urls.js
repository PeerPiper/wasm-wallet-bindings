// https://github.com/lencx/vite-plugin-rsw/issues/23#issuecomment-934974157

import { readFileSync, writeFileSync } from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const SLASH = path.sep

console.log("Fixing URL issue") //

const file = "./dist/index.mjs"
let fileName = path.resolve(__dirname, file)
const regex = /(?<=\n)(.*new URL.*)(?=\n)/g

try {
    writeFileSync(fileName, readFileSync(fileName, "utf8").replace(regex, ""))
} catch (error) {
    console.log({ error })
}

console.log("URL issue fixed")

process.exit(1)
