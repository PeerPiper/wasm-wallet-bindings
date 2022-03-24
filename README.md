# Build

```

npm run build
```

# Demo

To run the demo:

1. clone the repo from github
2. npm install
3. npm run dev

Then open `[http://localhost:8080](http://localhost:8080)`

# ES Module API

Import the `wallet`, await the `getWallet`, the use the methods:

```js
import { getWallet } from "@peerpiper/wasm-wallet-bindings"

wallet = await getWallet()

// Now use the methods

console.log({ wallet }) // shows you all the functions and objects in the console.

pubKey = wallet.public_key()
```

## API is in flux.

```
Proxcryptor: class Proxcryptor
SimpleKeypair: class SimpleKeypair

default: async ƒ init(input)
gen_mnemonic: ƒ gen_mnemonic()
generate_ed25519_keypair: ƒ generate_ed25519_keypair()
generate_ed25519_keypair_from_seed: ƒ generate_ed25519_keypair_from_seed(secret)
greet: ƒ greet()
public_key: ƒ public_key()
sign: ƒ sign(secret_key_bytes, message)
verify: ƒ verify(public_key, message, signature)
```
