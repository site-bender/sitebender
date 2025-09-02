import type {
	ComparatorConfig,
	Either,
	EngineError,
	LocalValues,
	MatchesComparator,
	OperationFunction,
} from "../../../../types/index.ts"

import { isLeft } from "../../../../../types/index.ts"
import Error from "../../../../constructors/Error/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const matches = (op: ComparatorConfig): OperationFunction<boolean> =>
async (
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<EngineError>, boolean>> => {
	const operandFn = await composeComparators(op.operand as unknown as never)
	const { pattern, flags } = op as MatchesComparator
	const patternFn = await composeComparators(pattern as unknown as never)

	const operand = await operandFn(arg, localValues)
	if (isLeft(operand)) return operand

	const patternValue = await patternFn(arg, localValues)
	if (isLeft(patternValue)) return patternValue

	try {
		const pattern = new RegExp(String(patternValue.right), flags)
		return pattern.test(String(operand.right)) ? { right: true } : {
			left: [
				Error(op.tag)("Matches")(`${operand.right} does not match ${pattern}.`),
			],
		}
	} catch (e) {
		return { left: [Error(op.tag)("Matches")(`Bad regular expression: ${e}.`)] }
	}
}

export default matches
