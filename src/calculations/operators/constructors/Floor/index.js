const Floor =
	(datatype = "Number") =>
	(decimalPlaces = 0) =>
	operand => ({
		tag: "Floor",
		datatype,
		decimalPlaces,
		operand,
	})

export default Floor
