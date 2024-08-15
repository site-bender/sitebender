import Error from "../../../constructors/Error"
import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const max = op => async (arg, localValues) => {
	const operands = await Promise.all(
		op.operands.map(
			async operand => await composeOperators(operand)(arg, localValues),
		),
	)

	if (operands.length === 0) {
		return {
			left: [
				Error(op)("Max")("Cannot get maximum of an empty list."),
				...operands,
			],
		}
	}

	if (operands.filter(isLeft).length) {
		return { left: [Error(op)("Max")("Bad input to Max."), ...operands] }
	}

	return { right: Math.max(...operands.map(r => r.right)) }
}

export default max
