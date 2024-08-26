import Error from "../../../../constructors/Error"
import getOperands from "../../../../utilities/getOperands"
import isLeft from "../../../../utilities/isLeft"

const isSameAlphabetically = op => async (arg, localValues) => {
	const ops = await getOperands(op)(arg, localValues)

	if (isLeft(ops)) {
		return ops
	}

	const [operand, test] = ops

	return operand === test
		? { right: operand }
		: {
				left: [
					Error(op)("IsSameAlphabetically")(
						`${operand} is not the same as ${test} alphabetically.`,
					),
				],
			}
}

export default isSameAlphabetically
