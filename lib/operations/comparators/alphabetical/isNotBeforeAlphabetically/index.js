import Error from "../../../../constructors/Error"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators"

const isNotBeforeAlphabetically = op => async (arg, localValues) => {
	const operand = await composeComparators(op.operand)(arg, localValues)
	const test = await composeComparators(op.test)(arg, localValues)

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
