import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const negate = op => async (arg, localValues) => {
	const operand = await composeOperators(op.operand)(arg, localValues)

	if (isLeft(operand)) {
		return operand
	}

	return { right: operand.right * -1 }
}

export default negate
