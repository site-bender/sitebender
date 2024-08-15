import Error from "../../../constructors/Error"
import collectOperandValues from "../../../utilities/collectOperandValues"
import isLeft from "../../../utilities/isLeft"
import mean from "../mean"

const standardDeviation = op => async (arg, localValues) => {
	const values = await collectOperandValues(op.operands)(arg, localValues)
	const { usePopulation } = op

	if (isLeft(values)) {
		return values
	}

	const len = values.right.length

	if (len === 0) {
		return {
			left: Error(op)("standardDeviation")(
				"Cannot take root mean square of an empty array.",
			),
		}
	}

	const m = await mean(op)(arg, localValues)

	const sum = values.right
		.reduce((sq, val) => sq.concat((val - m.right) ** 2), [])
		.reduce((sum, val) => sum + val, 0)

	const sd = Math.sqrt(sum / (len - (usePopulation ? 0 : 1)))

	return Number.isNaN(sd)
		? {
				left: Error(op)("standardDeviation")("Result is not a number."),
			}
		: { right: sd }
}

export default standardDeviation
