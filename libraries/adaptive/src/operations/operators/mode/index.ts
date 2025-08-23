import type { HydratedMode } from "../../../types/hydrated/index.ts"
import type {
	AdaptiveError,
	Either,
	GlobalAttributes,
	LocalValues,
	OperationFunction,
} from "../../../types/index.ts"

import Error from "../../../constructors/Error/index.ts"
import { isLeft } from "../../../types/index.ts"

const mode =
	({ operands, ...op }: HydratedMode): OperationFunction<number> =>
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
				left: [Error(op)("Mode")("Could not resolve all operands."), ...errors],
			}
		}

		const values = resolvedOperands.map((o) => o.right)
		const len = values.length

		if (len === 0) {
			return { left: Error(op)("Mode")("Cannot take mode of empty array.") }
		}

		const sorted = Object.entries(
			values.reduce((counts, val) => {
				counts[val] = (counts[val] || 0) + 1
				return counts
			}, {}),
		).sort((a, b) => b[1] - a[1])

		return castValue(datatype)({ right: sorted[0][0] })
	}

export default mode
