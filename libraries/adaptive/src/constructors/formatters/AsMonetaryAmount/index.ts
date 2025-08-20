const AsMonetaryAmount =
	(locales = "en-US") =>
	(options = { currency: "USD", style: "currency" }) =>
	(operand) => ({
		locales,
		operand,
		options,
		tag: "AsMonetaryAmount",
	})

export default AsMonetaryAmount
