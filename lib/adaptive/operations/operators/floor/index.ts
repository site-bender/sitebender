import isLeft from "../../../utilities/isLeft/index.js"

const floor =
	({ decimalPlaces, operand, ...op }) => async (arg, localValues) => {
		const resolvedOperand = await operand(arg, localValues)

		if (isLeft(resolvedOperand)) {
			return resolvedOperand
		}

		const multiplier = Math.pow(10, Math.max(0, decimalPlaces))

		return {
			right: Math.floor(resolvedOperand.right * multiplier) / multiplier,
		}
	}

export default floor
