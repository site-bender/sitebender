import compare from "../../comparator/index.ts"

const isNotBeforeTime = compare(
	(operand, test) => String(operand) >= String(test),
)

export default isNotBeforeTime
