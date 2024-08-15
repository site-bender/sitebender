import composeOperators from "../../operations/composers/composeOperators"
import isLeft from "../isLeft"

const collectOperandValues =
	(operands = []) =>
	async (arg, localValues) =>
		await operands.reduce(
			async (out, value) => {
				const operand = await composeOperators(value)(arg, localValues)

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
