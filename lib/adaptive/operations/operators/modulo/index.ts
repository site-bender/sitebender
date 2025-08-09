import Error from "../../../constructors/Error/index.js"
import isLeft from "../../../utilities/isLeft/index.js"

const modulo = ({ dividend, divisor, ...op }) => async (arg, localValues) => {
	const resolvedDividend = await dividend(arg, localValues)
	if (isLeft(resolvedDividend)) return resolvedDividend

	const resolvedDivisor = await divisor(arg, localValues)
	if (isLeft(resolvedDivisor)) return resolvedDivisor

	if (resolvedDivisor.right === 0) {
		return {
			left: [Error(op)("Modulo")("Cannot modulo by zero.")],
		}
	}

	const remainder = Math.abs(resolvedDividend.right % resolvedDivisor.right)

	return {
		right: resolvedDivisor.right < 0 ? remainder * -1 : remainder,
	}
}

export default modulo
