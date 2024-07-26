import Error from "../../../../constructors/Error"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators"

const isDescending = op => arg => {
	const operand = composeComparators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	const list = operand.right
	const sorted = [...list].sort().reverse()

	return JSON.stringify(list) === JSON.stringify(sorted)
		? operand
		: {
				left: [
					Error(op)("IsDescending")(`JSON.stringify(list) is not descending.`),
				],
			}
}

export default isDescending
