import isLeft from "../../../utilities/isLeft/index.js"

const hyperbolicSine = ({ operand, ...op }) => async (arg, localValues) => {
	const resolvedOperand = await operand(arg, localValues)

	if (isLeft(resolvedOperand)) {
		return resolvedOperand
	}

	return { right: Math.sinh(resolvedOperand.right) }
}

export default hyperbolicSine
