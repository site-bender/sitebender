import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const floor = op => async arg => {
	const operand = await composeOperators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	const multiplier = Math.pow(10, Math.max(0, op.decimalPlaces))

	return { right: Math.floor(operand.right * multiplier) / multiplier }
}

export default floor
