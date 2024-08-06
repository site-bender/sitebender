const Negate =
	(datatype = "Number") =>
	operand => ({
		tag: "Negate",
		operand,
		datatype,
	})

export default Negate
