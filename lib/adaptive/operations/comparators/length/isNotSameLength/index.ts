import compare from "../../compare.js"

const isNotSameLength = compare(
	(operand, test) => operand.length !== test.length,
)

export default isNotSameLength
