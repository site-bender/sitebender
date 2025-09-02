import compare from "../../comparator/index.ts"

const isNotSameDate = compare((operand, test) =>
	String(operand) !== String(test)
)

export default isNotSameDate
