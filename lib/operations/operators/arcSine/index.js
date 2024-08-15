import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const arcSine = op => async (arg, localValues) => {
	const operand = await composeOperators(op.operand)(arg, localValues)

	if (isLeft(operand)) {
		return operand
	}

	return { right: Math.asin(operand.right) }
}

export default arcSine
