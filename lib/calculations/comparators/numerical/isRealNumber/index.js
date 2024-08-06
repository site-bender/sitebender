import Error from "../../../../constructors/Error"
import isNumber from "../../../../guards/isNumber"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators"

const isRealNumber = op => async arg => {
	const operand = await composeComparators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	return isNumber(operand.right)
		? operand
		: {
				left: [
					Error(op)("IsRealNumber")(`${operand.right} is not a real number.`),
				],
			}
}

export default isRealNumber
