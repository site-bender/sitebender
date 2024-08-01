import {
	Min,
	composeOperators,
	Constant,
	Divide,
	FromArgument,
} from "@sitebender/sitebender"

const code = document.querySelector("#code-output")

const M = Min("Integer")
const Quotient = Divide("Integer")
const Int = Constant("Integer")
const Arg = FromArgument("Integer")

// Generate an min operation with nested division
// from constants and the passed argument
const config = M([Quotient(Int(20))(Int(2)), Int(11), Arg])

// Generate the calculate function by passing
// the operation object to composeOperators
const calculate = composeOperators(config)

// Show the config object and the result
const out =
	"The configuration generated by Min:\n\n" + JSON.stringify(config, null, 2)

if (code) {
	code.innerHTML = out
}

// Check the console below
console.log(JSON.stringify(calculate(9), null, 2))
