import Error from "../../../constructors/Error"
import { composeOperators } from "../../../main"
import isLeft from "../../../utilities/isLeft"

const asMonetaryAmount = op => async arg => {
	const { locales, operand, options } = op

	const value = await composeOperators(operand)(arg)

	if (isLeft(value)) {
		return value
	}

	try {
		const right = new Intl.NumberFormat(locales, {
			...options,
			style: "currency",
		}).format(value.right)

		return { right }
	} catch (e) {
		return Error(op)("MonetaryAmount")(`Cannot format amount: ${e}.`)
	}
}

export default asMonetaryAmount
