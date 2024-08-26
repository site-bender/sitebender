import { Temporal } from "temporal-polyfill"

import compare from "../../compare"

const isAfterDate = compare(
	(operand, test) => Temporal.PlainDate.compare(operand, test) > 0,
)

export default isAfterDate
