import type { HydratedStandardDeviation } from "../../../types/hydrated/index.ts"
import type {
	AdaptiveError,
	AriaAttributes,
	Either,
	GlobalAttributes,
	LocalValues,
	OperationFunction,
} from "../../../types/index.ts"

import Error from "../../../constructors/Error/index.ts"
import { isLeft } from "../../../types/index.ts"

const standardDeviation =
	({ operands, ...op }: HydratedStandardDeviation): OperationFunction<number> =>
	async (
		arg: unknown,
		localValues?: LocalValues,
	): Promise<Either<Array<AdaptiveError>, number>> => {
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
