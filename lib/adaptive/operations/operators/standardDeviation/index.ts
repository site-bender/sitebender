import Error from "../../../constructors/Error/index.js"
import isLeft from "../../../utilities/isLeft/index.js"

const standardDeviation =
	({ usePopulation, operands, ...op }) => async (arg, localValues) => {
		const resolvedOperands = await Promise.all(
			operands.map((operand) => operand(arg, localValues)),
		)
		const errors = resolvedOperands.filter(isLeft)

		if (errors.length) {
			return {
				left: [
					Error(op)("StandardDeviation")("Could not resolve all operands."),
					...errors,
				],
			}
		}

		const values = resolvedOperands.map((o) => o.right)
		const n = values.length

		if (n === 0) {
			return { right: 0 }
		}

		const mean = values.reduce((a, b) => a + b) / n
		const variance = values.reduce((a, b) => a + (b - mean) ** 2, 0) /
			(n - (usePopulation ? 0 : 1))

		return { right: Math.sqrt(variance) }
	}

export default standardDeviation
