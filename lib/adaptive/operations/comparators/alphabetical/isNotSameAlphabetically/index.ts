import Error from "../../../../constructors/Error"
import getOperands from "../../../../utilities/getOperands"
import isLeft from "../../../../utilities/isLeft.js"

const isNotSameAlphabetically = (op) => async (arg, localValues) => {
	const ops = await getOperands(op)(arg, localValues)

	if (isLeft(ops)) {
		return ops
	}

	const [operand, test] = ops

	return operand !== test ? { right: operand } : {
		left: [
			Error(op)("IsNotSameAlphabetically")(
				`${operand} is the same as ${test} alphabetically.`,
			),
		],
	}
}

export default isNotSameAlphabetically
