import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const cotangent = op => arg => {
	const operand = composeOperators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	return { right: 1 / Math.tan(operand.right) }
}

export default cotangent
