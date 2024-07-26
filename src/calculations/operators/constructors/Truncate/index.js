const Truncate =
	(datatype = "Number") =>
	(decimalPlaces = 0) =>
	operand => ({
		tag: "Truncate",
		datatype,
		decimalPlaces,
		operand,
	})

export default Truncate
