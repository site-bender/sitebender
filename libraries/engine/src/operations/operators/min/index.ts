import type { HydratedMin } from "../../../../types/hydrated/index.ts"
import type {
	EngineError,
	Either,
	LocalValues,
	OperationFunction,
} from "../../../types/index.ts"

import { isLeft } from "../../../../types/index.ts"
import _Error from "../../../constructors/Error/index.ts"

const min =
	({ operands, ..._op }: HydratedMin): OperationFunction<number | string> =>
	async (
		arg: unknown,
		localValues?: LocalValues,
	): Promise<Either<Array<EngineError>, number | string>> => {
		if (operands.length === 0) {
			return {
				left: [{
					tag: "Error",
					operation: "Min",
					message: "Cannot get minimum of an empty list.",
				}],
			}
		}

		const resolvedOperands = await Promise.all(
			operands.map((operand) => operand(arg, localValues)),
		)
		const errors = resolvedOperands.filter(isLeft)
		if (errors.length) {
			const lefts = errors as Array<{ left: Array<EngineError> }>
			const flattened: Array<EngineError> = lefts.flatMap((e) => e.left)
			return {
				left: [
					{
						tag: "Error",
						operation: "Min",
						message: "Could not resolve all operands.",
					},
					...flattened,
				],
			}
		}

		return {
			right: Math.min(
				...(resolvedOperands as Array<{ right: number | string }>).map((o) =>
					Number(o.right)
				),
			),
		}
	}

export default min
