const Exponent =
	(datatype = "Number") =>
	operand => ({
		tag: "Exponent",
		operand,
		datatype,
	})

export default Exponent
