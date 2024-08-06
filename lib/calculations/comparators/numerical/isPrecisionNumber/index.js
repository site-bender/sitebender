import Error from "../../../../constructors/Error"
import isNumber from "../../../../guards/isNumber"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators"

const isPrecisionNumber = op => async arg => {
	const operand = await composeComparators(op.operand)(arg)
	const { decimalPlaces } = op
	const pattern = new RegExp(
		`^([-+]?)(?:0|[1-9][0-9]*)([.][0-9]{0,${decimalPlaces}})?$`,
	)

	if (isLeft(operand)) {
		return operand
	}

	return isNumber(operand.right) && pattern.test(String(operand.right))
		? operand
		: {
				left: [
					Error(op)("IsPrecisionNumber")(
						`${operand.right} is not a precision number of up to ${decimalPlaces} decimal places.`,
					),
				],
			}
}

export default isPrecisionNumber
