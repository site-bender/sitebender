import {
	Average,
	composeOperators,
	Constant,
	Divide,
	FromArgument,
} from "@sitebender/sitebender"

const code = document.querySelector("#code-output")

const Avg = Average("Integer")
const Quotient = Divide("Integer")
const Int = Constant("Integer")
const Arg = FromArgument("Integer")

// Generate an addition with nested division
// from constants and the passed argument
const config = Avg([Quotient(Int(20))(Int(2)), Int(11), Arg])

// Generate the calculate function by passing
// the operation object to composeOperators
const calculate = composeOperators(config)

// Show the config object and the result
const out =
	"The configuration generated by Average:\n\n" +
	JSON.stringify(config, null, 2)

if (code) {
	code.innerHTML = out
}

// Check the console below
console.log("calculate(21) ->", calculate(21))
