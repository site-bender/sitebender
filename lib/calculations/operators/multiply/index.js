import Constant from "../../../injectors/constructors/Constant"
import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"
import { MULTIPLICATION_IDENTITY } from "../../constants"

const multiply = op => arg => {
	return op.multipliers.reduce(
		(sum, val) => {
			const operand = composeOperators(val)(arg)

			if (isLeft(sum)) {
				sum.left.push(operand)
				return sum
			}

			if (isLeft(operand)) {
				sum = { left: [sum, ...operand.left] }
				return sum
			}

			return { right: sum.right * operand.right }
		},
		composeOperators(Constant("Integer")(MULTIPLICATION_IDENTITY))(),
	)
}

export default multiply
