import Error from "../../../../constructors/Error"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators"

const isEqualTo = op => async arg => {
	const operand = await composeComparators(op.operand)(arg)
	const test = await composeComparators(op.test)(arg)

	if (isLeft(operand)) {
		operand.left.push(test)
		return operand
	}

	if (isLeft(test)) {
		return { left: [operand, ...test.left] }
	}

	return operand.right === test.right
		? { right: operand.right }
		: {
				left: [
					Error(op)("IsEqualTo")(
						`${operand.right} is not equal to ${test.right}.`,
					),
				],
			}
}

export default isEqualTo
