import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const unary = op => f => arg => {
	const operand = composeOperators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	return { right: f(operand.right) }
}

export default unary
