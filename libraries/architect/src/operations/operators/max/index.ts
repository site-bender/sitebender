import type { HydratedMax } from "../../../../types/hydrated/index.ts"
import type {
	ArchitectError,
	Either,
	LocalValues,
	OperationFunction,
} from "../../../types/index.ts"

import { isLeft } from "../../../../types/index.ts"
import _Error from "../../../constructors/Error/index.ts"

const max =
	({ operands, ..._op }: HydratedMax): OperationFunction<number | string> =>
	async (
		arg: unknown,
		localValues?: LocalValues,
	): Promise<Either<Array<ArchitectError>, number | string>> => {
		if (operands.length === 0) {
			return {
				left: [{
					tag: "Error",
					operation: "Max",
					message: "Cannot get maximum of an empty list.",
				}],
			}
		}

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
						operation: "Max",
						message: "Could not resolve all operands.",
					},
					...flattened,
				],
			}
		}

		return {
			right: Math.max(
				...(resolvedOperands as Array<{ right: number | string }>).map((
					o,
				) => Number(o.right)),
			),
		}
	}

export default max
