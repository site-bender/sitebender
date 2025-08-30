import compare from "../../comparator/index.ts"

const isNotSameLength = compare(
	(operand, test) => String(operand).length !== String(test).length,
)

export default isNotSameLength
