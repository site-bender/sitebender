import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const round = op => async (arg, localValues) => {
	const operand = await composeOperators(op.operand)(arg, localValues)

	if (isLeft(operand)) {
		return operand
	}

	const multiplier = Math.pow(10, Math.max(0, op.decimalPlaces))

	return { right: Math.round(operand.right * multiplier) / multiplier }
}

export default round
