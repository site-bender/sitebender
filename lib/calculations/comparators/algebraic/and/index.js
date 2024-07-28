import isLeft from "../../../../utilities/isLeft"
import composeComparators from "../../../composers/composeComparators"

const and = op => arg => {
	return op.operands.reduce((out, val) => {
		const operand = composeComparators(val)(arg)

		if (isLeft(out)) {
			out.left.push(operand)

			return out
		}

		if (isLeft(operand)) {
			out = { left: [out, ...operand.left] }

			return out
		}

		return operand
	}, {})
}

export default and
