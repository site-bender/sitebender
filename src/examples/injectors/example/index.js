import {
	Add,
	Subtract,
	Multiply,
	Divide,
	Negate,
	Power,
	Constant,
	FromArgument,
	FromElement,
	FromLookup,
	composeOperators,
} from "@sitebender/sitebender"

const code = document.querySelector("#code-output")

const op = Add()([
	Multiply()([
		Negate()(Divide()(Constant()(-21))(FromElement()({ name: "divisor" }))),
		Power()(FromElement()({ name: "base" }))(FromLookup()("exponent")),
	]),
	Subtract()(Constant()(5))(FromArgument()),
])

if (code) {
	code.innerHTML = JSON.stringify(op, null, 2)
}

console.log(composeOperators(op)(5))
