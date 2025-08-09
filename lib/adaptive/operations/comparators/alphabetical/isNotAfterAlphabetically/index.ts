import Error from "../../../../constructors/Error"
import getOperands from "../../../../utilities/getOperands"
import isLeft from "../../../../utilities/isLeft.js"

const isNotAfterAlphabetically = (op) => async (arg, localValues) => {
	const ops = await getOperands(op)(arg, localValues)

	if (isLeft(ops)) {
		return ops
	}

	const [operand, test] = ops

	return operand === test || [operand, test].sort()[1] === test
		? { right: operand }
		: {
			left: [
				Error(op)("IsNotAfterAlphabetically")(
					`${operand} is not before or equal to ${test} alphabetically.`,
				),
			],
		}
}

export default isNotAfterAlphabetically
