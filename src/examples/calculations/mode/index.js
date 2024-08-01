import {
	composeOperators,
	Constant,
	FromArgument,
	Mode,
} from "@sitebender/sitebender"

const code = document.querySelector("#code-output")

const Md = Mode("Integer")
const Int = Constant("Integer")
const Arg = FromArgument("Integer")

// Generate a mode operation with nested division
// from constants and the passed argument
const config = Md([Int(13), Int(5), Int(7), Int(13), Int(7), Arg])

// Generate the calculate function by passing
// the operation object to composeOperators
const calculate = composeOperators(config)

// Show the config object and the result
const out =
	"The configuration generated by Mode:\n\n" + JSON.stringify(config, null, 2)

if (code) {
	code.innerHTML = out
}

// Check the console below
console.log(JSON.stringify(calculate(13), null, 2))