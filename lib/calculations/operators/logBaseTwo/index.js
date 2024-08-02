import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const logBaseTwo = op => arg => {
	const operand = composeOperators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	return { right: Math.log2(operand.right) }
}

export default logBaseTwo
