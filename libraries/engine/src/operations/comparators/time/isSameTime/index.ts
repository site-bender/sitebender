import compare from "../../comparator/index.ts"

const isSameTime = compare(
	(operand: unknown, test: unknown) => String(operand) === String(test),
)

export default isSameTime
