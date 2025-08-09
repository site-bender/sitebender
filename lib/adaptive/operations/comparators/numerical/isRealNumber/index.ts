import Error from "../../../../constructors/Error"
import isNumber from "../../../../guards/isNumber"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators/index.js"

const isRealNumber = (op) => async (arg, localValues) => {
	const operand = await composeComparators(op.operand)(arg, localValues)

	if (isLeft(operand)) {
		return operand
	}

	return isNumber(operand.right) ? operand : {
		left: [
			Error(op)("IsRealNumber")(`${operand.right} is not a real number.`),
		],
	}
}

export default isRealNumber
