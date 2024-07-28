import Error from "../../../../constructors/Error"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators"

const isNoShorterThan = op => arg => {
	const operand = composeComparators(op.operand)(arg)
	const test = composeComparators(op.test)(arg)

	if (isLeft(operand)) {
		operand.left.push(test)
		return operand
	}

	if (isLeft(test)) {
		return { left: [operand, ...test.left] }
	}

	return operand.right.length >= test.right
		? { right: operand.right }
		: {
				left: [
					Error(op)("IsNoShorterThan")(
						`${JSON.stringify(operand.right)} must be no fewer than ${test.right} characters.`,
					),
				],
			}
}

export default isNoShorterThan
