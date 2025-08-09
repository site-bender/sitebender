import Error from "../../../constructors/Error/index.js"
import isOdd from "../../../guards/isOdd/index.js"
import isLeft from "../../../utilities/isLeft/index.js"

const median = ({ operands, ...op }) => async (arg, localValues) => {
	const resolvedOperands = await Promise.all(
		operands.map((operand) => operand(arg, localValues)),
	)
	const errors = resolvedOperands.filter(isLeft)

	if (errors.length) {
		return {
			left: [Error(op)("Median")("Could not resolve all operands."), ...errors],
		}
	}

	const values = resolvedOperands.map((o) => o.right)
	const len = values.length

	if (len === 0) {
		return {
			left: [Error(op)("Median")("Cannot take median of an empty array.")],
		}
	}

	const sorted = values.sort((a, b) => a - b)

	return {
		right: isOdd(len)
			? sorted[(len - 1) / 2]
			: (sorted[len / 2 - 1] + sorted[len / 2]) / 2,
	}
}

export default median
