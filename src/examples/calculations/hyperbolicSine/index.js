import {
	HyperbolicSine,
	composeOperators,
	FromArgument,
} from "@sitebender/sitebender"

const code = document.querySelector("#code-output")

const HSin = HyperbolicSine("Number")
const Arg = FromArgument("Number")

// Generate an sinh operation object
const config = HSin(Arg)

// Generate the composed sinh function
const calculate = composeOperators(config)

// Show the config object and the result
const out =
	"The configuration generated by HyperbolicSine:\n\n" +
	JSON.stringify(config, null, 2)

if (code) {
	code.innerHTML = out
}

// Check the console below
console.log(JSON.stringify(calculate(1), null, 2))
