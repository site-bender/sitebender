import type { HydratedMode } from "../../../../types/hydrated/index.ts"
import type {
	ArchitectError,
	Either,
	LocalValues,
	OperationFunction,
} from "../../../types/index.ts"

import { isLeft } from "../../../../types/index.ts"
import _Error from "../../../constructors/Error/index.ts"

const mode =
	({ operands, ..._op }: HydratedMode): OperationFunction<number> =>
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
						operation: "Mode",
						message: "Could not resolve all operands.",
					},
					...flattened,
				],
			}
		}

		const values = (resolvedOperands as Array<{ right: number }>).map((o) =>
			o.right
		)
		const len = values.length

		if (len === 0) {
			return {
				left: [{
					tag: "Error",
					operation: "Mode",
					message: "Cannot take mode of empty array.",
				}],
			}
		}

		const sorted = Object.entries(
			values.reduce((counts: Record<string, number>, val: number) => {
				const key = String(val)
				counts[key] = (counts[key] || 0) + 1
				return counts
			}, {} as Record<string, number>),
		).sort((a: [string, number], b: [string, number]) => b[1] - a[1])

		return { right: Number(sorted[0][0]) }
	}

export default mode
