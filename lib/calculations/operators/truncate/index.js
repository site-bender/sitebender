import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const truncate = op => arg => {
	const operand = composeOperators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	const multiplier = Math.pow(10, Math.max(0, op.decimalPlaces))

	return { right: Math.trunc(operand.right * multiplier) / multiplier }
}

export default truncate
