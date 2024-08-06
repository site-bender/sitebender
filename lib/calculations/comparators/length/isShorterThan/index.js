import Error from "../../../../constructors/Error"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators"

const isShorterThan = op => async arg => {
	const operand = await composeComparators(op.operand)(arg)
	const test = await composeComparators(op.test)(arg)

	if (isLeft(operand)) {
		operand.left.push(test)
		return operand
	}

	if (isLeft(test)) {
		return { left: [operand, ...test.left] }
	}

	return operand.right.length < test.right
		? { right: operand.right }
		: {
				left: [
					Error(op)("IsShorterThan")(
						`${JSON.stringify(operand.right)} must be fewer than ${test.right} characters.`,
					),
				],
			}
}

export default isShorterThan
