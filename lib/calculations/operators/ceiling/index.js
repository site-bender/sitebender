import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const ceiling = op => async arg => {
	const operand = await composeOperators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	const multiplier = Math.pow(10, Math.max(0, op.decimalPlaces))

	return { right: Math.ceil(operand.right * multiplier) / multiplier }
}

export default ceiling
