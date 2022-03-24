// for the exported library for use by other apps
// @ts-ignore
import wasm from "../../wasm-code/Cargo.toml"

const getWallet = async () => wasm()

export { getWallet }
