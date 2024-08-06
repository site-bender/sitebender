import Error from "../../../constructors/Error"
import isOdd from "../../../guards/isOdd"
import collectOperandValues from "../../../utilities/collectOperandValues"
import isLeft from "../../../utilities/isLeft"

const median = op => async arg => {
	const values = await collectOperandValues(op.operands)(arg)

	if (isLeft(values)) {
		return values
	}

	if (values.right.length === 0) {
		return {
			left: [Error(op)("Median")("Cannot take median of an empty array.")],
		}
	}

	const sorted = values.right.sort((a, b) => a - b)
	const len = sorted.length

	return {
		right: isOdd(len)
			? sorted[(len - 1) / 2]
			: (sorted[len / 2 - 1] + sorted[len / 2]) / 2,
	}
}

export default median
