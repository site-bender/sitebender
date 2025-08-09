import isLeft from "../../../utilities/isLeft/index.js"

const hyperbolicTangent = ({ operand, ...op }) => async (arg, localValues) => {
	const resolvedOperand = await operand(arg, localValues)

	if (isLeft(resolvedOperand)) {
		return resolvedOperand
	}

	return { right: Math.tanh(resolvedOperand.right) }
}

export default hyperbolicTangent
