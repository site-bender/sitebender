import Error from "../../../../constructors/Error"
import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators"

const isAscending = op => arg => {
	const operand = composeComparators(op.operand)(arg)

	if (isLeft(operand)) {
		return operand
	}

	const list = operand.right
	const sorted = [...list].sort()

	return JSON.stringify(list) === JSON.stringify(sorted)
		? operand
		: {
				left: [
					Error(op)("IsAscending")(`JSON.stringify(list) is not ascending.`),
				],
			}
}

export default isAscending
