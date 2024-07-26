import Error from "../../../../constructors/Error"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators"

const isMoresThan = op => arg => {
	const operand = composeComparators(op.operand)(arg)
	const test = composeComparators(op.test)(arg)

	if (isLeft(operand)) {
		operand.left.push(test)
		return operand
	}

	if (isLeft(test)) {
		return { left: [operand, ...test.left] }
	}

	return operand.right > test.right
		? { right: operand.right }
		: {
				left: [
					Error(op)("IsMoreThan")(
						`${operand.right} is not more than ${test.right}.`,
					),
				],
			}
}

export default isMoresThan
