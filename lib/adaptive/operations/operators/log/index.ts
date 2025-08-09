import isLeft from "../../../utilities/isLeft/index.js"

const log = ({ operand, ...op }) => async (arg, localValues) => {
	const resolvedOperand = await operand(arg, localValues)

	if (isLeft(resolvedOperand)) {
		return resolvedOperand
	}

	return { right: Math.log10(resolvedOperand.right) }
}

export default log
