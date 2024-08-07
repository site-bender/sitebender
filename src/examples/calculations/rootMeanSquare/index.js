import {
	composeOperators,
	Constant,
	Divide,
	FromArgument,
	RootMeanSquare,
} from "@sitebender/sitebender"

const code = document.querySelector("#code-output")

const Rms = RootMeanSquare("Integer")
const Quotient = Divide("Integer")
const Int = Constant("Integer")
const Arg = FromArgument("Integer")

// Generate a root-mean-square operation with nested division
// from constants and the passed argument
const config = Rms([Quotient(Int(84))(Int(4)), Int(1), Arg])

// Generate the calculate function by passing
// the operation object to composeOperators
const calculate = composeOperators(config)

// Show the config object and the result
const out =
	"The configuration generated by RootMeanSquare:\n\n" +
	JSON.stringify(config, null, 2)

if (code) {
	code.innerHTML = out
}

// Check the console below
console.log(JSON.stringify(calculate(2), null, 2))
