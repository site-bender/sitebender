const Reciprocal =
	(datatype = "Number") =>
	operand => ({
		tag: "Reciprocal",
		operand,
		datatype,
	})

export default Reciprocal
