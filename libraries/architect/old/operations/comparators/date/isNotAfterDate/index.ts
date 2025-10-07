import compare from "../../comparator/index.ts"

const isNotAfterDate = compare((operand: unknown, test: unknown) => {
	const a = String(operand)
	const b = String(test)
	return a <= b
})

export default isNotAfterDate
