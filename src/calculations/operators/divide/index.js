import Error from "../../../constructors/Error"
import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const divide = op => arg => {
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
			left: [dividend, Error(op)("Dividend")("Cannot divide by zero.")],
		}
	}

	return { right: dividend.right / divisor.right }
}

export default divide
