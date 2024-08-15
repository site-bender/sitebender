import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const sine = op => async (arg, localValues) => {
	const operand = await composeOperators(op.operand)(arg, localValues)

	if (isLeft(operand)) {
		return operand
	}

	return { right: Math.sin(operand.right) }
}

export default sine
