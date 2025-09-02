import compare from "../../comparator/index.ts"

const isAfterDateTime = compare((operand, test) => {
	const a = String(operand)
	const b = String(test)
	return a > b
})

export default isAfterDateTime
