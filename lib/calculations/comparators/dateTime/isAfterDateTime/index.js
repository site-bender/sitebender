import Error from "../../../../constructors/Error"
import castToDateTime from "../../../../utilities/castValue/castToDateTime"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators"

const isAfterDateTime = op => async arg => {
	const operand = await composeComparators(op.operand)(arg)
	const test = await composeComparators(op.test)(arg)

	if (isLeft(operand)) {
		operand.left.push(test)
		return operand
	}

	if (isLeft(test)) {
		return { left: [operand, ...test.left] }
	}

	const after = castToDateTime(operand.right)
	const before = castToDateTime(test.right)

	if (isLeft(before)) {
		return isLeft(after)
			? { left: [...before.left, ...after.left] }
			: { left: [...before.left, after] }
	}

	if (isLeft(after)) {
		return { left: [before, ...after.left] }
	}

	return before.right !== after.right && before.right < after.right
		? operand
		: {
				left: [
					Error(op)("IsAfterDateTime")(
						`${operand.right} is not after ${test.right}.`,
					),
				],
			}
}

export default isAfterDateTime
