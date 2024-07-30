import {
	composeOperators,
	Constant,
	Divide,
	Reciprocal,
} from "@sitebender/sitebender"

const code = document.querySelector("#code-output")

const R = Reciprocal("Number")
const Div = Divide("Integer")
const Int = Constant("Integer")

// Generate an reciprocal operation object
const config = R(Div(Int(1))(Int(7)))

// Generate the composed reciprocal function
const calculate = composeOperators(config)

// Show the config object and the result
const out =
	"The configuration generated by Reciprocal:\n\n" +
	JSON.stringify(config, null, 2)

if (code) {
	code.innerHTML = out
}

// Check the console below
// The reciprocal of 1 / 7 is 7
console.log("calculate() ->", calculate())
