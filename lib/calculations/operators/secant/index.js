import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const secant = op => arg => {
	const operand = composeOperators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	return { right: 1 / Math.cos(operand.right) }
}

export default secant
