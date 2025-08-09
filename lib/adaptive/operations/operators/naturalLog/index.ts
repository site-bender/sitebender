import isLeft from "../../../utilities/isLeft/index.js"

const naturalLog = ({ operand }) => async (arg, localValues) => {
	const resolvedOperand = await operand(arg, localValues)

	if (isLeft(resolvedOperand)) {
		return resolvedOperand
	}

	return { right: Math.log(resolvedOperand.right) }
}

export default naturalLog
