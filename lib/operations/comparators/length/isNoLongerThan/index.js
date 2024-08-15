import Error from "../../../../constructors/Error"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators"

const isNoLongerThan = op => async (arg, localValues) => {
	const operand = await composeComparators(op.operand)(arg, localValues)
	const test = await composeComparators(op.test)(arg, localValues)

	if (isLeft(operand)) {
		operand.left.push(test)
		return operand
	}

	if (isLeft(test)) {
		return { left: [operand, ...test.left] }
	}

	return operand.right.length <= test.right
		? { right: operand.right }
		: {
				left: [
					Error(op)("IsNoLongerThan")(
						`${JSON.stringify(operand.right)} must be no more than ${test.right} characters.`,
					),
				],
			}
}

export default isNoLongerThan
