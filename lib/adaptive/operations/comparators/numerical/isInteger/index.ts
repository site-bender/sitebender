import Error from "../../../../constructors/Error"
import isInt from "../../../../guards/isInteger"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators/index.js"

const isInteger = (op) => async (arg, localValues) => {
	const operand = await composeComparators(op.operand)(arg, localValues)

	if (isLeft(operand)) {
		return operand
	}

	return isInt(operand.right) ? operand : {
		left: [Error(op)("IsInteger")(`${operand.right} is not an integer.`)],
	}
}

export default isInteger
