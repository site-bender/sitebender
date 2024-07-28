import { WEEK_YEAR_MATCHER } from "../../../../constants"
import Error from "../../../../constructors/Error"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators"

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

const isYearWeek = op => arg => {
	const operand = composeComparators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	const [, year, week] = String(operand.right).match(WEEK_YEAR_MATCHER) || []
	const numWeeks = longYears.includes(year) ? 53 : 52

	return WEEK_YEAR_MATCHER.test(operand.right) && parseInt(week, 10) <= numWeeks
		? operand
		: {
				left: [
					Error(op)("IsYearWeek")(`${operand.right} is not a valid week-year.`),
				],
			}
}

export default isYearWeek
