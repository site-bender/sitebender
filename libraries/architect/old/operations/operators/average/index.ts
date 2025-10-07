import type { HydratedAverage } from "../../../../types/hydrated/index.ts"
import type {
	ArchitectError,
	Either,
	LocalValues,
	OperationFunction,
} from "../../../types/index.ts"

import { isLeft } from "../../../../types/index.ts"
import { ADDITION_IDENTITY } from "../../../constructors/constants/index.ts"
import _Error from "../../../constructors/Error/index.ts"

const average =
	({ operands, ..._op }: HydratedAverage): OperationFunction<number> =>
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
						operation: "Average",
						message: "Could not resolve all operands.",
					},
					...flattened,
				],
			}
		}

		if (resolvedOperands.length === 0) {
			return { right: 0 }
		}

		const rights = resolvedOperands as Array<{ right: number }>
		const total = rights.reduce(
			(acc, { right: value }) => acc + value,
			ADDITION_IDENTITY,
		)

		return { right: total / resolvedOperands.length }
	}

export default average
