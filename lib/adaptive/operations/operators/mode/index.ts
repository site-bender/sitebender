import Error from "../../../constructors/Error/index.js"
import castValue from "../../../utilities/castValue/index.js"
import isLeft from "../../../utilities/isLeft/index.js"

const mode = ({ operands, datatype, ...op }) => async (arg, localValues) => {
	const resolvedOperands = await Promise.all(
		operands.map((operand) => operand(arg, localValues)),
	)
	const errors = resolvedOperands.filter(isLeft)

	if (errors.length) {
		return {
			left: [Error(op)("Mode")("Could not resolve all operands."), ...errors],
		}
	}

	const values = resolvedOperands.map((o) => o.right)
	const len = values.length

	if (len === 0) {
		return { left: Error(op)("Mode")("Cannot take mode of empty array.") }
	}

	const sorted = Object.entries(
		values.reduce((counts, val) => {
			counts[val] = (counts[val] || 0) + 1
			return counts
		}, {}),
	).sort((a, b) => b[1] - a[1])

	return castValue(datatype)({ right: sorted[0][0] })
}

export default mode
