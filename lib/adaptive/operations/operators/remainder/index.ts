import Error from "../../../constructors/Error/index.js"
import isLeft from "../../../utilities/isLeft/index.js"

const remainder =
	({ dividend, divisor, ...op }) => async (arg, localValues) => {
		const resolvedDividend = await dividend(arg, localValues)
		if (isLeft(resolvedDividend)) return resolvedDividend

		const resolvedDivisor = await divisor(arg, localValues)
		if (isLeft(resolvedDivisor)) return resolvedDivisor

		if (resolvedDivisor.right === 0) {
			return {
				left: [Error(op)("Remainder")("Cannot divide by zero.")],
			}
		}

		return { right: resolvedDividend.right % resolvedDivisor.right }
	}

export default remainder
