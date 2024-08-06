import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const naturalLog = op => async arg => {
	const operand = await composeOperators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	return { right: Math.log(operand.right) }
}

export default naturalLog
