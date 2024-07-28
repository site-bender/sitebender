import {
	Add,
	composeOperators,
	Constant,
	Divide,
	FromArgument,
} from "@sitebender/sitebender"

const code = document.querySelector("#code-output")

const Sum = Add("Integer")
const Quotient = Divide("Integer")
const Int = Constant("Integer")
const Arg = FromArgument("Integer")

// Generate an addition with nested division
// from constants and the passed argument
const config = Sum([Quotient(Int(20))(Int(2)), Int(11), Arg])

// Run the calculation returning Either<Error, Integer>
const calculate = composeOperators(config)

// Show the config object and the sum
if (code) {
	code.innerHTML = `${JSON.stringify(config, null, 2)}

calculate(21) // ${JSON.stringify(calculate(21))} = (20 / 2) + 11 + 21
`
}
