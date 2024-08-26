import { Temporal } from "temporal-polyfill"

import compare from "../../compare"

const comparator = (operand, test) =>
	Temporal.PlainDateTime.compare(operand, test) < 0

const isBeforeDateTime = compare(comparator)

export default isBeforeDateTime
