import compare from "../../comparator/index.ts"

const comparator = (operand: unknown, test: unknown) =>
	String(operand) < String(test)

const isBeforeDateTime = compare(comparator)

export default isBeforeDateTime
