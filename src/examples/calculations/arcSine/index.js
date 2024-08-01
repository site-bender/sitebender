import { ArcSine, composeOperators, FromArgument } from "@sitebender/sitebender"

const code = document.querySelector("#code-output")

const ASin = ArcSine("Number")
const Arg = FromArgument("Number")

// Generate an arcsine operation object
const config = ASin(Arg)

// Generate the composed arcsine function
const calculate = composeOperators(config)

// Show the config object and the result
const out =
	"The configuration generated by ArcSine:\n\n" +
	JSON.stringify(config, null, 2)

if (code) {
	code.innerHTML = out
}

// Check the console below
console.log(JSON.stringify(calculate(0), null, 2))