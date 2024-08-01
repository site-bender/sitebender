import { Round, composeOperators, FromArgument } from "@sitebender/sitebender"

const code = document.querySelector("#code-output")

const Round2 = Round("Number")(2)
const Arg = FromArgument("Number")

// Generate an round operation object
const config = Round2(Arg)

// Generate the composed round function
const calculate = composeOperators(config)

// Show the config object and the result
const out =
	"The configuration generated by Round:\n\n" + JSON.stringify(config, null, 2)

if (code) {
	code.innerHTML = out
}

// Check the console below
console.log(JSON.stringify(calculate(11.223344), null, 2))
// Five rounds up, four rounds down
console.log(JSON.stringify(calculate(-33.445566), null, 2))