import type { HydratedStandardDeviation } from "../../../../types/hydrated/index.ts"
import type {
	Either,
	ArchitectError,
	LocalValues,
	OperationFunction,
} from "../../../types/index.ts"

import { isLeft } from "../../../../types/index.ts"

const standardDeviation = (
	{ operands, ..._op }: HydratedStandardDeviation,
): OperationFunction<number> =>
async (
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<ArchitectError>, number>> => {
	const resolvedOperands = await Promise.all(
		operands.map((operand) => operand(arg, localValues)),
	)
	const errors = resolvedOperands.filter(isLeft)

	if (errors.length) {
		const lefts = errors as Array<{ left: Array<ArchitectError> }>
		const flattened: Array<ArchitectError> = lefts.flatMap((e) => e.left)
		return {
			left: [
				{
					tag: "Error",
					operation: "StandardDeviation",
					message: "Could not resolve all operands.",
				},
				...flattened,
			],
		}
	}

	const rights = resolvedOperands as Array<{ right: number }>
	const values = rights.map((o) => o.right)
	const n = values.length

	if (n === 0) {
		return { right: 0 }
	}

	const mean = values.reduce((a, b) => a + b) / n
	// Default to sample standard deviation (n - 1)
	const variance = values.reduce((a, b) => a + (b - mean) ** 2, 0) /
		(n - 1)

	return { right: Math.sqrt(variance) }
}

export default standardDeviation
