import Error from "../../../../constructors/Error"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators"

const isLongerThan = op => async arg => {
	const operand = await composeComparators(op.operand)(arg)
	const test = await composeComparators(op.test)(arg)

	if (isLeft(operand)) {
		operand.left.push(test)
		return operand
	}

	if (isLeft(test)) {
		return { left: [operand, ...test.left] }
	}

	return operand.right.length > test.right
		? { right: operand.right }
		: {
				left: [
					Error(op)("IsLongerThan")(
						`${JSON.stringify(operand.right)} must be more than ${test.right} characters.`,
					),
				],
			}
}

export default isLongerThan
