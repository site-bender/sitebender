import Error from "../../../../constructors/Error"
import isNum from "../../../../guards/isNumber"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators/index.js"

const isNumber = (op) => async (arg, localValues) => {
	const operand = await composeComparators(op.operand)(arg, localValues)

	if (isLeft(operand)) {
		return operand
	}

	return isNum(operand.right) ? operand : {
		left: [Error(op)("IsNumber")(`${operand.right} is not a number.`)],
	}
}

export default isNumber
