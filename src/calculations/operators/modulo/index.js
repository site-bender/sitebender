import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const modulo = op => arg => {
	const dividend = composeOperators(op.dividend)(arg)
	const divisor = composeOperators(op.divisor)(arg)

	if (isLeft(dividend)) {
		dividend.left.push(divisor)
		return dividend
	}

	if (isLeft(divisor)) {
		return { left: [dividend, ...divisor.left] }
	}

	if (divisor.right === 0) {
		return {
			left: [dividend, Error(op)("Dividend")("Cannot modulo by zero.")],
		}
	}

	const remainder = dividend.right % divisor.right

	if (remainder < 0) {
		return {
			right:
				divisor.right < 0
					? remainder - divisor.right
					: remainder + divisor.right,
		}
	}

	return { right: remainder }
}

export default modulo
