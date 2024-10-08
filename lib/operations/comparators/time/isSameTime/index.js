import { Temporal } from "temporal-polyfill"

import compare from "../../compare"

const isSameTime = compare(
	(operand, test) => Temporal.PlainTime.compare(operand, test) === 0,
)

export default isSameTime
