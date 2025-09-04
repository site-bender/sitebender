// no extra types needed

import compare from "../../comparator/index.ts"

const isNotSameTime = compare(
	(operand: unknown, test: unknown) => String(operand) !== String(test),
)

export default isNotSameTime
