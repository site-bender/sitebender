import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const remainder = op => async (arg, localValues) => {
	const dividend = await composeOperators(op.dividend)(arg, localValues)
	const divisor = await composeOperators(op.divisor)(arg, localValues)

	if (isLeft(dividend)) {
		dividend.left.push(divisor)
		return dividend
	}

	if (isLeft(divisor)) {
		return { left: [dividend, ...divisor.left] }
	}

	if (divisor.right === 0) {
		return {
			left: [dividend, Error(op)("Dividend")("Cannot get remainder by zero.")],
		}
	}

	return { right: dividend.right % divisor.right }
}

export default remainder
