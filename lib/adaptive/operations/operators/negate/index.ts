import isLeft from "../../../utilities/isLeft/index.js"

const negate = ({ operand, ...op }) => async (arg, localValues) => {
	const resolvedOperand = await operand(arg, localValues)

	if (isLeft(resolvedOperand)) {
		return resolvedOperand
	}

	return { right: resolvedOperand.right * -1 }
}

export default negate
