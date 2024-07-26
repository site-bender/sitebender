import Error from "../../../../constructors/Error"
import castToDate from "../../../../utilities/castValue/castToDate"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators"

const isNotBeforeDate = op => arg => {
	const operand = composeComparators(op.operand)(arg)
	const test = composeComparators(op.test)(arg)

	if (isLeft(operand)) {
		operand.left.push(test)
		return operand
	}

	if (isLeft(test)) {
		return { left: [operand, ...test.left] }
	}

	const after = castToDate(operand.right)
	const before = castToDate(test.right)

	if (isLeft(before)) {
		return isLeft(after)
			? { left: [...before.left, ...after.left] }
			: { left: [...before.left, after] }
	}

	if (isLeft(after)) {
		return { left: [before, ...after.left] }
	}

	return before.right === after.right || before.right < after.right
		? operand
		: {
				left: [
					Error(op)("IsNotBeforeDate")(
						`${operand.right} is not not before ${test.right}.`,
					),
				],
			}
}

export default isNotBeforeDate
