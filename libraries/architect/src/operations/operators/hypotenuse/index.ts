import type { HydratedHypotenuse } from "../../../../types/hydrated/index.ts"
import type {
	Either,
	ArchitectError,
	LocalValues,
	OperationFunction,
} from "../../../types/index.ts"

import { isLeft } from "../../../../types/index.ts"
import _Error from "../../../constructors/Error/index.ts"

const hypotenuse =
	({ operands, ..._op }: HydratedHypotenuse): OperationFunction<number> =>
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
						operation: "Hypotenuse",
						message: "Could not resolve all operands.",
					},
					...flattened,
				],
			}
		}

		const rights = resolvedOperands as Array<{ right: number }>
		const total = rights.reduce(
			(acc, { right: value }) => acc + value * value,
			0,
		)

		return { right: Math.sqrt(total) }
	}

export default hypotenuse
