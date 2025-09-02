import compare from "../../comparator/index.ts"

const isSameTime = compare(
	(operand, test) => String(operand) === String(test),
)

export default isSameTime
