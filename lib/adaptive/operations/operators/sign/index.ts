import isLeft from "../../../utilities/isLeft/index.js"

const sign = ({ operand, ...op }) => async (arg, localValues) => {
	const resolvedOperand = await operand(arg, localValues)

	if (isLeft(resolvedOperand)) {
		return resolvedOperand
	}

	return { right: Math.sign(resolvedOperand.right) }
}

export default sign
