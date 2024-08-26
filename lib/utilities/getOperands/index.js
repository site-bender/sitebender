import composeComparators from "../../operations/composers/composeComparators"
import isLeft from "../isLeft"

const getOperands = op => async (arg, localValues) => {
	const operand = await composeComparators(op.operand)(arg, localValues)
	const test = await composeComparators(op.test)(arg, localValues)

	if (isLeft(operand)) {
		operand.left.push(test)
		return operand
	}

	if (isLeft(test)) {
		return { left: [operand, ...test.left] }
	}

	return [operand.right, test.right]
}

export default getOperands
