import Constant from "../../../injectors/constructors/Constant"
import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"
import { ADDITION_IDENTITY } from "../../constants"

const add = operation => arg => {
	return operation.addends.reduce(
		(sum, val) => {
			const operand = composeOperators(val)(arg)

			if (isLeft(sum)) {
				sum.left.push(operand)

				return sum
			}

			if (isLeft(operand)) {
				return { left: [sum, ...operand.left] }
			}

			return { right: sum.right + operand.right }
		},
		composeOperators(Constant("Integer")(ADDITION_IDENTITY))(),
	)
}

export default add
