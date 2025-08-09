import { Temporal } from "temporal-polyfill"

import compare from "../../compare.js"

const isAfterTime = compare(
	(operand, test) => Temporal.PlainTime.compare(operand, test) > 0,
)

export default isAfterTime
