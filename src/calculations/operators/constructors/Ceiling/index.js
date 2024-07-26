const Ceiling =
	(datatype = "Number") =>
	(decimalPlaces = 0) =>
	operand => ({
		tag: "Ceiling",
		datatype,
		decimalPlaces,
		operand,
	})

export default Ceiling
