import compare from "../../comparator/index.ts"

const isNotAfterTime = compare(
	(operand: unknown, test: unknown) => String(operand) <= String(test),
)

export default isNotAfterTime
