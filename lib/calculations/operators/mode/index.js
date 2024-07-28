import Error from "../../../constructors/Error"
import castValue from "../../../utilities/castValue"
import collectOperandValues from "../../../utilities/collectOperandValues"
import isLeft from "../../../utilities/isLeft"

const mode = op => arg => {
	const { datatype } = op
	const values = collectOperandValues(op.operands)(arg)

	if (isLeft(values)) {
		return values
	}

	if (values.right.length === 0) {
		return { left: Error(op)("mode")("Cannot take mode of empty array.") }
	}

	const sorted = Object.entries(
		values.right.reduce((counts, val) => {
			counts[val] = (counts[val] || 0) + 1

			return counts
		}, {}),
	).sort((a, b) => b[1] - a[1])

	return castValue(datatype)({ right: sorted[0][0] })
}

export default mode
