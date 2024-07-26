import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const negate = op => arg => {
	const operand = composeOperators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	return { right: operand.right * -1 }
}

export default negate
