import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const unary = f => op => arg => {
	const operand = composeOperators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	return { right: f(operand.right) }
}

export default unary
