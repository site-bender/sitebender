import {
	composeOperators,
	Constant,
	Root,
	FromArgument,
	Multiply,
} from "@sitebender/sitebender"

const code = document.querySelector("#code-output")

const Product = Multiply("Integer")
const R = Root("Number")
const Int = Constant("Integer")
const Arg = FromArgument("Integer")

// Generate a root operation with nested multiplication
// from constants and the passed argument
const config = R(Product([Int(3), Int(5), Int(15)]))(Arg)

// Generate the calculate function by passing
// the operation object to composeOperators
const calculate = composeOperators(config)

// Show the config object and the product
const out =
	"The configuration generated by Root:\n\n" + JSON.stringify(config, null, 2)

if (code) {
	code.innerHTML = out
}

// Check the console below
console.log(JSON.stringify(calculate(2), null, 2))
