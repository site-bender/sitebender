import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

console.log("composeOperators", composeOperators)

const unary = f => op => arg => {
	const operand = composeOperators(op.operand)(arg)

	console.log("operand", operand)

	if (isLeft(operand)) {
		return operand
	}

	return { right: f(operand.right) }
}

export default unary
