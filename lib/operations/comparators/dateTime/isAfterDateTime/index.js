import { Temporal } from "temporal-polyfill"

import compare from "../../compare"

const isAfterDateTime = compare(
	(operand, test) => Temporal.PlainDateTime.compare(operand, test) > 0,
)

export default isAfterDateTime
