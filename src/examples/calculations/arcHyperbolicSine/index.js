import {
	ArcHyperbolicSine,
	composeOperators,
	FromArgument,
} from "@sitebender/sitebender"

const code = document.querySelector("#code-output")

const AHSin = ArcHyperbolicSine("Number")
const Arg = FromArgument("Number")

// Generate an asinh operation object
const config = AHSin(Arg)

// Generate the composed asinh function
const calculate = composeOperators(config)

// Show the config object and the result
const out =
	"The configuration generated by ArcHyperbolicSine:\n\n" +
	JSON.stringify(config, null, 2)

if (code) {
	code.innerHTML = out
}

// Check the console below
console.log(JSON.stringify(calculate(0), null, 2))
