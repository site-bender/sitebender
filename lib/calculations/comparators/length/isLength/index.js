import Error from "../../../../constructors/Error"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators"

const isLength = op => arg => {
	const operand = composeComparators(op.operand)(arg)
	const test = composeComparators(op.test)(arg)

	if (isLeft(operand)) {
		operand.left.push(test)
		return operand
	}

	if (isLeft(test)) {
		return { left: [operand, ...test.left] }
	}

	return operand.right.length === test.right
		? { right: operand.right }
		: {
				left: [
					Error(op)("IsLength")(
						`${JSON.stringify(operand.right)} must be ${test.right} characters long.`,
					),
				],
			}
}

export default isLength
