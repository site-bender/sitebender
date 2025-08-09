import Error from "../../../constructors/Error/index.js"
import isLeft from "../../../utilities/isLeft/index.js"

const min = ({ operands, ...op }) => async (arg, localValues) => {
	if (operands.length === 0) {
		return {
			left: [Error(op)("Min")("Cannot get minimum of an empty list.")],
		}
	}

	const resolvedOperands = await Promise.all(
		operands.map((operand) => operand(arg, localValues)),
	)
	const errors = resolvedOperands.filter(isLeft)

	if (errors.length) {
		return {
			left: [Error(op)("Min")("Could not resolve all operands."), ...errors],
		}
	}

	return { right: Math.min(...resolvedOperands.map((o) => o.right)) }
}

export default min
