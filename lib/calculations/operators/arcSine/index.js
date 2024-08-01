import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const arcSine = op => arg => {
	const operand = composeOperators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	return { right: Math.asin(operand.right) }
}

export default arcSine
