import { composeOperators, Constant } from "@sitebender/sitebender"

const code = document.querySelector("#code-output")

const Int = Constant("Integer")

// Generate an constant operation object
const config = Int(77)

// Generate the composed constant function
const calculate = composeOperators(config)

// Show the config object and the result
const out =
	"The configuration generated by Constant:\n\n" +
	JSON.stringify(config, null, 2)

if (code) {
	code.innerHTML = out
}

// Check the console below
console.log(JSON.stringify(calculate(calculate(), null, 2)))