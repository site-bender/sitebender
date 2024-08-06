import composeOperators from "../../calculations/composers/composeOperators"
import isLeft from "../isLeft"

const collectOperandValues =
	(operands = []) =>
	async arg =>
		await operands.reduce(
			async (out, value) => {
				const operand = await composeOperators(value)(arg)

				let ret = await out

				if (isLeft(ret)) {
					ret.left.push(operand)

					return ret
				}

				if (isLeft(operand)) {
					return { left: [ret, ...operand.left] }
				}

				return { right: [...ret.right, operand.right] }
			},
			{ right: [] },
		)

export default collectOperandValues
