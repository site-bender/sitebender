import { composeOperators } from "../../../main"
import isLeft from "../../../utilities/isLeft"

const asMonetaryAmount = op => async (arg, localValues) => {
	const { locales, operand, options } = op

	const value = await composeOperators(operand)(arg, localValues)

	if (isLeft(value)) {
		return value
	}

	return {
		right: new Intl.NumberFormat(locales, {
			...options,
			style: "currency",
		}).format(value.right),
	}
}

export default asMonetaryAmount
