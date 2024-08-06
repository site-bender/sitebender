import Error from "../../../../constructors/Error"
import isStr from "../../../../guards/isString"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators"

const isString = op => async arg => {
	const operand = await composeComparators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	return isStr(operand.right)
		? operand
		: {
				left: [Error(op)("IsString")(`${operand.right} is not a string.`)],
			}
}

export default isString
