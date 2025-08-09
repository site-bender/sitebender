import isLeft from "../../../utilities/isLeft/index.js"

const logBaseTwo = ({ operand, ...op }) => async (arg, localValues) => {
	const resolvedOperand = await operand(arg, localValues)

	if (isLeft(resolvedOperand)) {
		return resolvedOperand
	}

	return { right: Math.log2(resolvedOperand.right) }
}

export default logBaseTwo
