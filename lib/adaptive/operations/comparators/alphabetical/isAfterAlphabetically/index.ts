import Error from "../../../../constructors/Error"
import getOperands from "../../../../utilities/getOperands"
import isLeft from "../../../../utilities/isLeft.js"

const isAfterAlphabetically = (op) => async (arg, localValues) => {
	const ops = await getOperands(op)(arg, localValues)

	if (isLeft(ops)) {
		return ops
	}

	const [operand, test] = ops

	return operand !== test && [operand, test].sort()[1] === operand
		? { right: operand }
		: {
			left: [
				Error(op)("IsAfterAlphabetically")(
					`${operand} is not after ${test} alphabetically.`,
				),
			],
		}
}

export default isAfterAlphabetically
