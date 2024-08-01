import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const cosecant = op => arg => {
	const operand = composeOperators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	return { right: 1 / Math.sin(operand.right) }
}

export default cosecant
