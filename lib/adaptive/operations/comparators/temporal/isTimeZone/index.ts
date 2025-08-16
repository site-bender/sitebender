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

const isTimeZone = (op: ComparatorConfig): OperationFunction<boolean> =>
async (
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<AdaptiveError>, boolean>> => {
	const operand = await composeComparators(op.operand)(arg, localValues)

	if (isLeft(operand)) {
		return operand
	}

	try {
		// Temporal.TimeZone is not available in Deno yet
		// Workaround: check if it's a valid timezone by trying to use it in a ZonedDateTime
		const timeZone = String(operand.right)
		// Try to create a ZonedDateTime with the timezone
		const _ = Temporal.ZonedDateTime.from(`2024-01-01T00:00:00[${timeZone}]`)
		return operand
	} catch (e) {
		return {
			left: [
				Error(op)("IsTimeZone")(`${operand.right} is not a time zone: ${e}.`),
			],
		}
	}
}

export default isTimeZone
