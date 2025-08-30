type MonetaryOptions = { currency: string; style: "currency" }
type MonetaryFormatterConfig = {
    tag: "AsMonetaryAmount"
    locales: string
    options: MonetaryOptions
    operand?: unknown
}

const AsMonetaryAmount =
	(locales: string = "en-US") =>
	(options: MonetaryOptions = { currency: "USD", style: "currency" }) =>
	(operand?: unknown): MonetaryFormatterConfig => ({
		locales,
		operand,
		options,
		tag: "AsMonetaryAmount",
	})

export default AsMonetaryAmount
