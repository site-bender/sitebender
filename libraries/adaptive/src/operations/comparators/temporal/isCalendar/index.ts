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

const isCalendar = (op: ComparatorConfig): OperationFunction<boolean> =>
async (
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<AdaptiveError>, boolean>> => {
	const operand = await composeComparators(op.operand)(arg, localValues)

	if (isLeft(operand)) {
		return operand
	}

	try {
		// Temporal.Calendar is not available in Deno yet
		// Workaround: check if it's a valid calendar by trying to use it in a PlainDate
		const calendarId = String(operand.right)
		// Try to create a date with the calendar
		const _ = new Temporal.PlainDate(2024, 1, 1, calendarId)
		return operand
	} catch (e) {
		return {
			left: [
				Error(op)("IsCalendar")(`${operand.right} is not a calendar: ${e}.`),
			],
		}
	}
}

export default isCalendar
