import { Temporal } from "temporal-polyfill"

import compare from "../../compare"

const isBeforeTime = compare(
	(operand, test) => Temporal.PlainTime.compare(operand, test) < 0,
)

export default isBeforeTime
