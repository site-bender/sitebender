import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const absoluteValue = op => async arg => {
	const operand = await composeOperators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	return { right: Math.abs(operand.right) }
}

export default absoluteValue