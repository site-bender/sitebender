import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const hyperbolicSine = op => async arg => {
	const operand = await composeOperators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	return { right: Math.sinh(operand.right) }
}

export default hyperbolicSine
