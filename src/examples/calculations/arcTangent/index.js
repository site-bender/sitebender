import {
	ArcTangent,
	composeOperators,
	FromArgument,
} from "@sitebender/sitebender"

const code = document.querySelector("#code-output")

const ATan = ArcTangent("Number")
const Arg = FromArgument("Number")

// Generate an arctangent operation object
const config = ATan(Arg)

// Generate the composed arctangent function
const calculate = composeOperators(config)

// Show the config object and the result
const out =
	"The configuration generated by ArcTangent:\n\n" +
	JSON.stringify(config, null, 2)

if (code) {
	code.innerHTML = out
}

// Check the console below
console.log(JSON.stringify(calculate(0), null, 2))