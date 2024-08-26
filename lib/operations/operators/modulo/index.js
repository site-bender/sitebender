import Error from "../../../constructors/Error"
import isLeft from "../../../utilities/isLeft"
import composeOperators from "../../composers/composeOperators"

const modulo = op => async (arg, localValues) => {
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
			left: [dividend, Error(op)("Dividend")("Cannot modulo by zero.")],
		}
	}

	const remainder = Math.abs(dividend.right % divisor.right)

	return {
		right: divisor.right < 0 ? remainder * -1 : remainder,
	}
}

export default modulo
