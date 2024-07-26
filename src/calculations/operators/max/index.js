import Error from "../../../constructors/Error"
import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const max = op => arg => {
	const operands = op.operands.map(operand => composeOperators(operand)(arg))

	if (operands.filter(isLeft).length) {
		return { left: [Error(op)("Max")("Bad input to Max."), ...operands] }
	}

	return { right: Math.max(...operands.map(r => r.right)) }
}

export default max
