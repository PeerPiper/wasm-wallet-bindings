<script>
    import { onMount } from "svelte"

    import { getWallet } from "./index"

    // import wasm from "../../../wasm-code/Cargo.toml"

    let wallet, pubKey

    onMount(async () => {
        wallet = await getWallet()
        console.log({ wallet })

        pubKey = wallet.generate_mnemonic()
    })
</script>

<main>
    <h1>Let's wasm some javascript code!</h1>
    <p>{pubKey}</p>
</main>
