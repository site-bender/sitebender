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

import { isLeft } from "../../../../../types/index.ts"
import Error from "../../../../constructors/Error/index.ts"
import { MATCHERS } from "../../../../guards/constants/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const longYears = [
	"1976",
	"1981",
	"1987",
	"1992",
	"1998",
	"2004",
	"2009",
	"2015",
	"2020",
	"2026",
	"2032",
	"2037",
	"2043",
	"2048",
	"2054",
	"2060",
	"2065",
	"2071",
	"2076",
	"2082",
	"2088",
	"2093",
	"2099",
]

const isYearWeek = (op: ComparatorConfig): OperationFunction<boolean> =>
async (
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<AdaptiveError>, boolean>> => {
	const operand = await composeComparators(op.operand)(arg, localValues)

	if (isLeft(operand)) {
		return operand
	}

	const [, year, week] = String(operand.right).match(MATCHERS.weekYear) || []
	const numWeeks = longYears.includes(year) ? 53 : 52

	return MATCHERS.weekYear.test(operand.right) && parseInt(week, 10) <= numWeeks
		? operand
		: {
			left: [
				Error(op)("IsYearWeek")(`${operand.right} is not a valid week-year.`),
			],
		}
}

export default isYearWeek
