import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const log = op => async arg => {
	const operand = await composeOperators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	return { right: Math.log10(operand.right) }
}

export default log
