import isLeft from "../../../utilities/isLeft/index.js"

const sine = ({ operand, ...op }) => async (arg, localValues) => {
	const resolvedOperand = await operand(arg, localValues)

	if (isLeft(resolvedOperand)) {
		return resolvedOperand
	}

	return { right: Math.sin(resolvedOperand.right) }
}

export default sine
