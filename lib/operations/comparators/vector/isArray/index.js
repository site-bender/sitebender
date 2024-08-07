import Error from "../../../../constructors/Error"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators"

const isArray = op => async arg => {
	const operand = await composeComparators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	return Array.isArray(operand.right)
		? operand
		: {
				left: [
					Error(op)("IsArray")(
						`${JSON.stringify(operand.right)} is not an array.`,
					),
				],
			}
}

export default isArray