import { Log, composeOperators, FromArgument } from "@sitebender/sitebender"

const code = document.querySelector("#code-output")

const L = Log("Number")
const Arg = FromArgument("Number")

// Generate a base ten logarithm operation object
const config = L(Arg)

// Generate the composed base ten logarithm function
const calculate = composeOperators(config)

// Show the config object and the result
const out =
	"The configuration generated by Log:\n\n" + JSON.stringify(config, null, 2)

if (code) {
	code.innerHTML = out
}

// Check the console below
// 10^2 is 100
console.log("calculate(100) ->", calculate(100))
