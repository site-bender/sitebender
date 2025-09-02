import compare from "../../comparator/index.ts"

const isNotAfterTime = compare(
	(operand, test) => String(operand) <= String(test),
)

export default isNotAfterTime
