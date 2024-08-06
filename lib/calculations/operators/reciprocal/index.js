import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const reciprocal = op => async arg => {
	const operand = await composeOperators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	return { right: 1 / operand.right }
}

export default reciprocal
