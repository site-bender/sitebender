import { Temporal } from "temporal-polyfill"

import compare from "../../compare"

const isNotBeforeDate = compare(
	(operand, test) => Temporal.PlainDate.compare(operand, test) >= 0,
)

export default isNotBeforeDate
