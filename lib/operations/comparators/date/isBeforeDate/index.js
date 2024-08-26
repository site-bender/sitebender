import { Temporal } from "temporal-polyfill"

import compare from "../../compare"

const isBeforeDate = compare(
	(operand, test) => Temporal.PlainDate.compare(operand, test) < 0,
)

export default isBeforeDate
