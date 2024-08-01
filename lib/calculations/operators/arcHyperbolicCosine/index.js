import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const arcHyperbolicCosine = op => arg => {
	const operand = composeOperators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	return { right: Math.acosh(operand.right) }
}

export default arcHyperbolicCosine
