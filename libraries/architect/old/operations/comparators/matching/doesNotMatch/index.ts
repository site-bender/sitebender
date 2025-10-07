import type {
	ArchitectError,
	ComparatorConfig,
	Either,
	LocalValues,
	MatchesComparator,
	OperationFunction,
} from "../../../../types/index.ts"

import { isLeft } from "../../../../../types/index.ts"
import Error from "../../../../constructors/Error/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const doesNotMatch =
	(op: ComparatorConfig): OperationFunction<boolean> =>
	async (
		arg: unknown,
		localValues?: LocalValues,
	): Promise<Either<Array<ArchitectError>, boolean>> => {
		const operandFn = await composeComparators(
			op.operand as unknown as never,
		)
		const { pattern, flags } = op as MatchesComparator
		const patternFn = await composeComparators(pattern as unknown as never)
		const operand = await operandFn(arg, localValues)

		if (isLeft(operand)) {
			return operand
		}

		try {
			const patternValue = await patternFn(arg, localValues)
			if (isLeft(patternValue)) return patternValue
			const pattern = new RegExp(String(patternValue.right), flags)

			return pattern.test(String(operand.right))
				? {
					left: [
						Error(op.tag)("DoesNotMatch")(
							`${operand.right} matches ${pattern}.`,
						),
					],
				}
				: { right: true }
		} catch (e) {
			return {
				left: [
					Error(op.tag)("DoesNotMatch")(
						`Bad regular expression: ${e}.`,
					),
				],
			}
		}
	}

export default doesNotMatch
