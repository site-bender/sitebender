import isLeft from "../../../utilities/isLeft/index.js"

const reciprocal = ({ operand, ...op }) => async (arg, localValues) => {
	const resolvedOperand = await operand(arg, localValues)

	if (isLeft(resolvedOperand)) {
		return resolvedOperand
	}

	return { right: 1 / resolvedOperand.right }
}

export default reciprocal
