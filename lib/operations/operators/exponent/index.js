import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const exponent = op => async arg => {
	const operand = await composeOperators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	return { right: Math.exp(operand.right) }
}

export default exponent
