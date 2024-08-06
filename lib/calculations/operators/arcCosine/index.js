import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const arcCosine = op => async arg => {
	const operand = await composeOperators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	return { right: Math.acos(operand.right) }
}

export default arcCosine
