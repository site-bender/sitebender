import type { HydratedRootMeanSquare } from "../../../types/hydrated/index.ts"
import type {
	AdaptiveError,
	Either,
	GlobalAttributes,
	LocalValues,
	OperationFunction,
} from "../../../types/index.ts"

import Error from "../../../constructors/Error/index.ts"
import { isLeft } from "../../../types/index.ts"

const rootMeanSquare =
	({ operands, ...op }: HydratedRootMeanSquare): OperationFunction<number> =>
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
