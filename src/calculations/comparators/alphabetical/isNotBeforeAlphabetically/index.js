import Error from "../../../../constructors/Error"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators"

const isNotBeforeAlphabetically = op => arg => {
	const operand = composeComparators(op.operand)(arg)
	const test = composeComparators(op.test)(arg)

	if (isLeft(operand)) {
		operand.left.push(test)
		return operand
	}

	if (isLeft(test)) {
		return { left: [operand, ...test.left] }
	}

	return operand.right === test.right ||
		[operand.right, test.right].sort()[1] === operand.right
		? { right: operand.right }
		: {
				left: [
					Error(op)("IsNotBeforeAlphabetically")(
						`${operand.right} is not after ${test.right} alphabetically.`,
					),
				],
			}
}

export default isNotBeforeAlphabetically
