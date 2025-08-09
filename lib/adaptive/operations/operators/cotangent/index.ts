import isLeft from "../../../utilities/isLeft/index.js"

const cotangent = ({ operand, ...op }) => async (arg, localValues) => {
	const resolvedOperand = await operand(arg, localValues)

	if (isLeft(resolvedOperand)) {
		return resolvedOperand
	}

	return { right: 1 / Math.tan(resolvedOperand.right) }
}

export default cotangent
