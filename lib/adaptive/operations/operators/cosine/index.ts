import isLeft from "../../../utilities/isLeft/index.js"

const cosine = ({ operand, ...op }) => async (arg, localValues) => {
	const resolvedOperand = await operand(arg, localValues)

	if (isLeft(resolvedOperand)) {
		return resolvedOperand
	}

	return { right: Math.cos(resolvedOperand.right) }
}

export default cosine
