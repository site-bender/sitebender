import { Temporal } from "temporal-polyfill"

import compare from "../../compare.js"

const isNotSameDate = compare(
	(operand, test) => Temporal.PlainDate.compare(operand, test) !== 0,
)

export default isNotSameDate
