import isLeft from "../../../utilities/isLeft/index.js"

const tangent = ({ operand, ...op }) => async (arg, localValues) => {
	const resolvedOperand = await operand(arg, localValues)

	if (isLeft(resolvedOperand)) {
		return resolvedOperand
	}

	return { right: Math.tan(resolvedOperand.right) }
}

export default tangent
