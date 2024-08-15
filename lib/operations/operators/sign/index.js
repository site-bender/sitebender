import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const sign = op => async (arg, localValues) => {
	const operand = await composeOperators(op.operand)(arg, localValues)

	if (isLeft(operand)) {
		return operand
	}

	return { right: Math.sign(operand.right) }
}

export default sign
