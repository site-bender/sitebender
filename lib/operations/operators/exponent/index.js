import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const exponent = op => async (arg, localValues) => {
	const operand = await composeOperators(op.operand)(arg, localValues)

	if (isLeft(operand)) {
		return operand
	}

	return { right: Math.exp(operand.right) }
}

export default exponent
