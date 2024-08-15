import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const secant = op => async (arg, localValues) => {
	const operand = await composeOperators(op.operand)(arg, localValues)

	if (isLeft(operand)) {
		return operand
	}

	return { right: 1 / Math.cos(operand.right) }
}

export default secant
