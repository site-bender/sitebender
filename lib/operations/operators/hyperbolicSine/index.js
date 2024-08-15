import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const hyperbolicSine = op => async (arg, localValues) => {
	const operand = await composeOperators(op.operand)(arg, localValues)

	if (isLeft(operand)) {
		return operand
	}

	return { right: Math.sinh(operand.right) }
}

export default hyperbolicSine
