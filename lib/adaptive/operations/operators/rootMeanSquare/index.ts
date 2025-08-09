import Error from "../../../constructors/Error/index.js"
import isLeft from "../../../utilities/isLeft/index.js"

const rootMeanSquare = ({ operands, ...op }) => async (arg, localValues) => {
	const resolvedOperands = await Promise.all(
		operands.map((operand) => operand(arg, localValues)),
	)
	const errors = resolvedOperands.filter(isLeft)

	if (errors.length) {
		return {
			left: [
				Error(op)("RootMeanSquare")("Could not resolve all operands."),
				...errors,
			],
		}
	}

	if (resolvedOperands.length === 0) {
		return { right: 0 }
	}

	const total = resolvedOperands.reduce(
		(acc, { right: value }) => acc + value * value,
		0,
	)

	return { right: Math.sqrt(total / resolvedOperands.length) }
}

export default rootMeanSquare
