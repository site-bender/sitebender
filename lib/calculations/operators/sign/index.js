import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const sign = op => arg => {
	const operand = composeOperators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	return { right: Math.sign(operand.right) }
}

export default sign
