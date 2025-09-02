import compare from "../../comparator/index.ts"

const isBeforeTime = compare(
	(operand, test) => String(operand) < String(test),
)

export default isBeforeTime
