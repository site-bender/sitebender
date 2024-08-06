import Constant from "../../../injectors/constructors/Constant"
import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"
import { MULTIPLICATION_IDENTITY } from "../../constants"

const multiply = op => async arg => {
	return op.multipliers.reduce(
		async (total, val) => {
			const operand = await composeOperators(val)(arg)

			let sum = await total

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
