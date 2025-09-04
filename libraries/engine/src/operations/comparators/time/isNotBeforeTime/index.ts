import compare from "../../comparator/index.ts"

const isNotBeforeTime = compare(
	(operand: unknown, test: unknown) => String(operand) >= String(test),
)

export default isNotBeforeTime
