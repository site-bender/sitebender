import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const tangent = op => arg => {
	const operand = composeOperators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	return { right: Math.tan(operand.right) }
}

export default tangent
