import composeOperators from "../../calculations/composers/composeOperators"
import isLeft from "../isLeft"

const collectOperandValues =
	(operands = []) =>
	arg =>
		operands.reduce(
			(out, value) => {
				const operand = composeOperators(value)(arg)

				if (isLeft(out)) {
					out.left.push(operand)

					return out
				}

				if (isLeft(operand)) {
					return { left: [out, ...operand.left] }
				}

				return { right: [...out.right, operand.right] }
			},
			{ right: [] },
		)

export default collectOperandValues
