import compare from "../../comparator/index.ts"

const isNotBeforeDate = compare((operand, test) => {
	const a = String(operand)
	const b = String(test)
	return a >= b
})

export default isNotBeforeDate
