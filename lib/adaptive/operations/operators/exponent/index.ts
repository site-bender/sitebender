import isLeft from "../../../utilities/isLeft/index.js"

const exponent = ({ operand, ...op }) => async (arg, localValues) => {
	const resolvedOperand = await operand(arg, localValues)

	if (isLeft(resolvedOperand)) {
		return resolvedOperand
	}

	return { right: Math.exp(resolvedOperand.right) }
}

export default exponent
