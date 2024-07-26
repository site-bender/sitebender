import Error from "../../../../constructors/Error"
import isInt from "../../../../guards/isInteger"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators"

const isInteger = op => arg => {
	const operand = composeComparators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	return isInt(operand.right)
		? operand
		: {
				left: [Error(op)("IsInteger")(`${operand.right} is not an integer.`)],
			}
}

export default isInteger
