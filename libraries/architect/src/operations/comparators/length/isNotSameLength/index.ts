import compare from "../../comparator/index.ts"

const isNotSameLength = compare(
	(operand: unknown, test: unknown) =>
		String(operand).length !== String(test).length,
)

export default isNotSameLength
