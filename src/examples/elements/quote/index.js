import { Q, render, TextNode } from "@sitebender/sitebender"

const output = document.querySelector("#output")
const code = document.querySelector("#code-output")
const quote = "Whom the gods would destroy, they first make mad."

// Generate a <q> element configuration
const config = Q({ id: "my-quote" })(TextNode(`${quote}`))

// render the <q> to an <output>
await render(output)(config)()

// let's take a look at the config object
if (code) {
	code.innerHTML = JSON.stringify(config, null, 2)
}
