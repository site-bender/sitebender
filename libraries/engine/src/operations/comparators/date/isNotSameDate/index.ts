import compare from "../../comparator/index.ts"

const isNotSameDate = compare((operand: unknown, test: unknown) =>
	String(operand) !== String(test)
)

export default isNotSameDate
