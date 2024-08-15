import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const logBaseTwo = op => async (arg, localValues) => {
	const operand = await composeOperators(op.operand)(arg, localValues)

	if (isLeft(operand)) {
		return operand
	}

	return { right: Math.log2(operand.right) }
}

export default logBaseTwo
