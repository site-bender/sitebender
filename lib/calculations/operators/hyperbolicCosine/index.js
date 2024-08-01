import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const hyperbolicCosine = op => arg => {
	const operand = composeOperators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	return { right: Math.cosh(operand.right) }
}

export default hyperbolicCosine
