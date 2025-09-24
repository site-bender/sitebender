import compare from "../../comparator/index.ts"

const isNotBeforeDate = compare((operand: unknown, test: unknown) => {
	const a = String(operand)
	const b = String(test)
	return a >= b
})

export default isNotBeforeDate
