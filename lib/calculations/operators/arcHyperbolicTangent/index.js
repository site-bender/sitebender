import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const arcHyperbolicTangent = op => arg => {
	const operand = composeOperators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	return { right: Math.atanh(operand.right) }
}

export default arcHyperbolicTangent
