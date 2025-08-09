import isLeft from "../../../utilities/isLeft/index.js"

const cosecant = ({ operand, ...op }) => async (arg, localValues) => {
	const resolvedOperand = await operand(arg, localValues)

	if (isLeft(resolvedOperand)) {
		return resolvedOperand
	}

	return { right: 1 / Math.sin(resolvedOperand.right) }
}

export default cosecant
