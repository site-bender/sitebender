import isLeft from "../../../utilities/isLeft/index.js"

const truncate =
	({ decimalPlaces, operand, ...op }) => async (arg, localValues) => {
		const resolvedOperand = await operand(arg, localValues)

		if (isLeft(resolvedOperand)) {
			return resolvedOperand
		}

		const multiplier = Math.pow(10, decimalPlaces || 0)
		return {
			right: Math.trunc(resolvedOperand.right * multiplier) / multiplier,
		}
	}

export default truncate
