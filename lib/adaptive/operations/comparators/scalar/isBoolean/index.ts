import Error from "../../../../constructors/Error"
import isBool from "../../../../guards/isBoolean"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators/index.js"

const isBoolean = (op) => async (arg, localValues) => {
	const operand = await composeComparators(op.operand)(arg, localValues)

	if (isLeft(operand)) {
		return operand
	}

	return isBool(operand.right) ? operand : {
		left: [
			Error(op)("IsBoolean")(
				`${operand.right} is not a boolean value (true/false).`,
			),
		],
	}
}

export default isBoolean
