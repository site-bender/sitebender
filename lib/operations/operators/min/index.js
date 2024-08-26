import Error from "../../../constructors/Error"
import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const min = op => async (arg, localValues) => {
	const operands = await Promise.all(
		op.operands.map(
			async operand => await composeOperators(operand)(arg, localValues),
		),
	)

	if (operands.length === 0) {
		return {
			left: [
				Error(op)("Min")("Cannot get minimum of an empty list."),
				...operands,
			],
		}
	}

	if (operands.filter(isLeft).length) {
		return { left: [Error(op)("Min")("Bad input to Min."), ...operands] }
	}

	return { right: Math.min(...operands.map(r => r.right)) }
}

export default min
