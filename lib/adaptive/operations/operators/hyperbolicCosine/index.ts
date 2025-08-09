import isLeft from "../../../utilities/isLeft/index.js"

const hyperbolicCosine = ({ operand }) => async (arg, localValues) => {
	const resolvedOperand = await operand(arg, localValues)

	if (isLeft(resolvedOperand)) {
		return resolvedOperand
	}

	return { right: Math.cosh(resolvedOperand.right) }
}

export default hyperbolicCosine
