// no extra types needed

import compare from "../../comparator/index.ts"

const isNotSameTime = compare(
	(operand, test) => String(operand) !== String(test),
)

export default isNotSameTime
