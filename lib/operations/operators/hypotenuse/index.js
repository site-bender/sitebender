import collectOperandValues from "../../../utilities/collectOperandValues"
import isLeft from "../../../utilities/isLeft"

const hypotenuse = op => async arg => {
	const values = await collectOperandValues(op.operands)(arg)

	if (isLeft(values)) {
		return values
	}

	if (values.right.length === 0) {
		return {
			left: Error(op)("hypotenuse")(
				"Cannot take hypotenuse of an empty array.",
			),
		}
	}

	return { right: Math.hypot(...values.right) }
}

export default hypotenuse
