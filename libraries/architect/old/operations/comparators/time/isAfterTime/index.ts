import compare from "../../comparator/index.ts"

const isAfterTime = compare(
	(operand: unknown, test: unknown) => String(operand) > String(test),
)

export default isAfterTime
