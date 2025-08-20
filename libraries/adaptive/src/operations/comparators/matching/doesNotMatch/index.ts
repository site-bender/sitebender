import type {
	AdaptiveError,
	ComparatorConfig,
	Either,
	GlobalAttributes,
	LocalValues,
	Operand,
	OperationFunction,
	Value,
} from "../../../../types/index.ts"

import Error from "../../../../constructors/Error/index.ts"
import { isLeft } from "../../../../types/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const doesNotMatch =
	(op: ComparatorConfig): OperationFunction<boolean> =>
	async (
		arg: unknown,
		localValues?: LocalValues,
	): Promise<Either<Array<AdaptiveError>, boolean>> => {
		const operand = await composeComparators(op.operand)(arg, localValues)

		if (isLeft(operand)) {
			return operand
		}

		try {
			const pattern = new RegExp(op.pattern, op.flags)

			return pattern.test(operand.right)
				? {
					left: [
						Error(op)("DoesNotMatch")(`${operand.right} matches ${pattern}.`),
					],
				}
				: { right: true }
		} catch (e) {
			return {
				left: Error(op)("DoesNotMatch")(`Bad regular expression: ${e}.`),
			}
		}
	}

export default doesNotMatch
