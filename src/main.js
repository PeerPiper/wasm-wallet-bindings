// for the demp svelte ui build
import App from "./Component.svelte"

const app = new App({
    target: document.body,
    props: {
        name: "world",
    },
})
