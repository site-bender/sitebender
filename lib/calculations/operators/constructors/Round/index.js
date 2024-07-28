const Round =
	(datatype = "Number") =>
	(decimalPlaces = 0) =>
	operand => ({
		tag: "Round",
		datatype,
		decimalPlaces,
		operand,
	})

export default Round
