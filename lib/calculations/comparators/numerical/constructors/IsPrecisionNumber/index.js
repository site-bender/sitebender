const IsPrecisionNumber =
	operand =>
	(decimalPlaces = 0) => ({
		tag: "IsPrecisionNumber",
		datatype: "PrecisionNumber",
		decimalPlaces,
		operand,
	})

export default IsPrecisionNumber
