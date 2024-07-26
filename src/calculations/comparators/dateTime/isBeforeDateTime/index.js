import Error from "../../../../constructors/Error"
import castToDateTime from "../../../../utilities/castValue/castToDateTime"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators"

const isBeforeDateTime = op => arg => {
	const operand = composeComparators(op.operand)(arg)
	const test = composeComparators(op.test)(arg)

	if (isLeft(operand)) {
		operand.left.push(test)
		return operand
	}

	if (isLeft(test)) {
		return { left: [operand, ...test.left] }
	}

	const before = castToDateTime(operand.right)
	const after = castToDateTime(test.right)

	if (isLeft(before)) {
		return isLeft(after)
			? { left: [...before.left, ...after.left] }
			: { left: [...before.left, after] }
	}

	if (isLeft(after)) {
		return { left: [before, ...after.left] }
	}

	return before.right < after.right
		? operand
		: {
				left: [
					Error(op)("IsBeforeDateTime")(
						`${operand.right} is not before ${test.right}.`,
					),
				],
			}
}

export default isBeforeDateTime
