import { Temporal } from "temporal-polyfill"

import compare from "../../compare"

const isSameDate = compare(
	(operand, test) => Temporal.PlainDate.compare(operand, test) === 0,
)

export default isSameDate
