import compare from "../../compare"

const isNotSameLength = compare(
	(operand, test) => operand.length !== test.length,
)

export default isNotSameLength
