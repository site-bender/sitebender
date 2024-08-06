import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const secant = op => async arg => {
	const operand = await composeOperators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	return { right: 1 / Math.cos(operand.right) }
}

export default secant
