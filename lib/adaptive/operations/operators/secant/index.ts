import isLeft from "../../../utilities/isLeft/index.js"

const secant = ({ operand, ...op }) => async (arg, localValues) => {
	const resolvedOperand = await operand(arg, localValues)

	if (isLeft(resolvedOperand)) {
		return resolvedOperand
	}

	return { right: 1 / Math.cos(resolvedOperand.right) }
}

export default secant
