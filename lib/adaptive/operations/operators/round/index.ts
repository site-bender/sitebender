import isLeft from "../../../utilities/isLeft/index.js"

const round =
	({ decimalPlaces, operand, ...op }) => async (arg, localValues) => {
		const resolvedOperand = await operand(arg, localValues)

		if (isLeft(resolvedOperand)) {
			return resolvedOperand
		}

		const multiplier = Math.pow(10, decimalPlaces || 0)
		return {
			right: Math.round(resolvedOperand.right * multiplier) / multiplier,
		}
	}

export default round
