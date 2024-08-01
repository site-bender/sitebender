import { Sine, composeOperators, FromArgument } from "@sitebender/sitebender"

const code = document.querySelector("#code-output")

const Sin = Sine("Number")
const Arg = FromArgument("Number")

// Generate an sine operation object
const config = Sin(Arg)

// Generate the composed sine function
const calculate = composeOperators(config)

// Show the config object and the result
const out =
	"The configuration generated by Sine:\n\n" + JSON.stringify(config, null, 2)

if (code) {
	code.innerHTML = out
}

// Check the console below
console.log(JSON.stringify(calculate(0), null, 2))