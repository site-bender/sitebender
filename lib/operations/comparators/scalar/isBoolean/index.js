import Error from "../../../../constructors/Error"
import isBool from "../../../../guards/isBoolean"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators"

const isBoolean = op => async arg => {
	const operand = await composeComparators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	return isBool(operand.right)
		? operand
		: {
				left: [
					Error(op)("IsBoolean")(
						`${operand.right} is not a boolean value (true/false).`,
					),
				],
			}
}

export default isBoolean
