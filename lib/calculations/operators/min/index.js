import Error from "../../../constructors/Error"
import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const min = op => arg => {
	const operands = op.operands.map(operand => composeOperators(operand)(arg))

	if (operands.filter(isLeft).length) {
		return { left: [Error(op)("Min")("Bad input to Min."), ...operands] }
	}

	return { right: Math.min(...operands.map(r => r.right)) }
}

export default min
