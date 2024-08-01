import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const arcTangent = op => arg => {
	const operand = composeOperators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	return { right: Math.atan(operand.right) }
}

export default arcTangent
