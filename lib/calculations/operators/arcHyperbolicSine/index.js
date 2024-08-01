import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const arcHyperbolicSine = op => arg => {
	const operand = composeOperators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	return { right: Math.asinh(operand.right) }
}

export default arcHyperbolicSine
