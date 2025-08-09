import Error from "../../../constructors/Error/index.js"
import isLeft from "../../../utilities/isLeft/index.js"

const max = ({ operands, ...op }) => async (arg, localValues) => {
	if (operands.length === 0) {
		return {
			left: [Error(op)("Max")("Cannot get maximum of an empty list.")],
		}
	}

	const resolvedOperands = await Promise.all(
		operands.map((operand) => operand(arg, localValues)),
	)
	const errors = resolvedOperands.filter(isLeft)

	if (errors.length) {
		return {
			left: [Error(op)("Max")("Could not resolve all operands."), ...errors],
		}
	}

	return { right: Math.max(...resolvedOperands.map((o) => o.right)) }
}

export default max
