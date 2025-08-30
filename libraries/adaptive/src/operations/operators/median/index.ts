import type { HydratedMedian } from "../../../../types/hydrated/index.ts"
import type {
	AdaptiveError,
	Either,
	LocalValues,
	OperationFunction,
} from "../../../types/index.ts"

import { isLeft } from "../../../../types/index.ts"
import _Error from "../../../constructors/Error/index.ts"
import isOdd from "../../../guards/isOdd/index.ts"

const median =
	({ operands, ..._op }: HydratedMedian): OperationFunction<number> =>
	async (
		arg: unknown,
		localValues?: LocalValues,
	): Promise<Either<Array<AdaptiveError>, number>> => {
		const resolvedOperands = await Promise.all(
			operands.map((operand) => operand(arg, localValues)),
		)
		const errors = resolvedOperands.filter(isLeft)
		if (errors.length) {
			const lefts = errors as Array<{ left: Array<AdaptiveError> }>
			const flattened: Array<AdaptiveError> = lefts.flatMap((e) => e.left)
			return {
				left: [
					{ tag: "Error", operation: "Median", message: "Could not resolve all operands." },
					...flattened,
				],
			}
		}

		const values = (resolvedOperands as Array<{ right: number }>).map((o) => o.right)
		const len = values.length

		if (len === 0) {
			return {
				left: [{ tag: "Error", operation: "Median", message: "Cannot take median of an empty array." }],
			}
		}

		const sorted = values.sort((a, b) => a - b)

		return {
			right: isOdd(len)
				? sorted[(len - 1) / 2]
				: (sorted[len / 2 - 1] + sorted[len / 2]) / 2,
		}
	}

export default median
