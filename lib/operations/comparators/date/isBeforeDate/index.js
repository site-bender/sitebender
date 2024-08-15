import Error from "../../../../constructors/Error"
import castToDate from "../../../../utilities/castValue/castToDate"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators"

const isBeforeDate = op => async (arg, localValues) => {
	const operand = await composeComparators(op.operand)(arg, localValues)
	const test = await composeComparators(op.test)(arg, localValues)

	if (isLeft(operand)) {
		operand.left.push(test)
		return operand
	}

	if (isLeft(test)) {
		return { left: [operand, ...test.left] }
	}

	const before = castToDate(operand.right)
	const after = castToDate(test.right)

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
					Error(op)("IsBeforeDate")(
						`${operand.right} is not before ${test.right}.`,
					),
				],
			}
}

export default isBeforeDate
