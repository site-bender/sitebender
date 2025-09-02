import type {
	ComparatorConfig,
	Either,
	EngineError,
	LocalValues,
	OperationFunction,
} from "@engineTypes/index.ts"

import { isLeft } from "@engineTypes/index.ts"

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
): Promise<Either<Array<EngineError>, boolean>> => {
	const operandFn = await composeComparators(
		(op as unknown as { operand: unknown }).operand as never,
	)
	const operand = await operandFn(arg, localValues)

	if (isLeft(operand)) return operand

	const s = String(operand.right)
	const [, year, week] = s.match(MATCHERS.weekYear) || []
	const numWeeks = longYears.includes(year) ? 53 : 52

	const ok = MATCHERS.weekYear.test(s) && parseInt(week, 10) <= numWeeks
	return ok
		? { right: true }
		: { left: [Error(op.tag)("IsYearWeek")(`${s} is not a valid week-year.`)] }
}

export default isYearWeek
