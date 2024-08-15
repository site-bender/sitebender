import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const log = op => async (arg, localValues) => {
	const operand = await composeOperators(op.operand)(arg, localValues)

	if (isLeft(operand)) {
		return operand
	}

	return { right: Math.log10(operand.right) }
}

export default log
