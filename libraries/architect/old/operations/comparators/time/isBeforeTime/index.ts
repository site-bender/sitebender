import compare from "../../comparator/index.ts"

const isBeforeTime = compare(
	(operand: unknown, test: unknown) => String(operand) < String(test),
)

export default isBeforeTime
