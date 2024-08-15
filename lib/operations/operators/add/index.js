import Constant from "../../../injectors/constructors/Constant"
import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"
import { ADDITION_IDENTITY } from "../../constants"

const add = operation => async (arg, localValues) => {
	return operation.addends.reduce(
		async (total, val) => {
			const operand = await composeOperators(val)(arg, localValues)

			let sum = await total

			if (isLeft(sum)) {
				sum.left.push(operand)

				return sum
			}

			if (isLeft(operand)) {
				return { left: [sum, ...operand.left] }
			}

			return { right: sum.right + operand.right }
		},
		await composeOperators(Constant("Integer")(ADDITION_IDENTITY))(),
	)
}

export default add
