import Error from "../../../../constructors/Error"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators"

const isBeforeAlphabetically = op => arg => {
	const operand = composeComparators(op.operand)(arg)
	const test = composeComparators(op.test)(arg)

	if (isLeft(operand)) {
		operand.left.push(test)
		return operand
	}

	if (isLeft(test)) {
		return { left: [operand, ...test.left] }
	}

	return operand.right !== test.right &&
		[operand.right, test.right].sort()[1] === test.right
		? { right: operand.right }
		: {
				left: [
					Error(op)("IsBeforeAlphabetically")(
						`${operand.right} is not before ${test.right} alphabetically.`,
					),
				],
			}
}

export default isBeforeAlphabetically
