import Error from "../../../constructors/Error"
import collectOperandValues from "../../../utilities/collectOperandValues"
import isLeft from "../../../utilities/isLeft"

const rootMeanSquare = op => arg => {
	const values = collectOperandValues(op.operands)(arg)

	if (isLeft(values)) {
		return values
	}

	if (values.right.length === 0) {
		return {
			left: Error(op)("rootMeanSquare")(
				"Cannot take root mean square of an empty array.",
			),
		}
	}

	return {
		right: Math.sqrt(
			values.right.map(n => n * n).reduce((sum, n) => sum + n, 0),
		),
	}
}

export default rootMeanSquare