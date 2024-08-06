const Cosine =
	(datatype = "Number") =>
	operand => ({
		tag: "Cosine",
		operand,
		datatype,
	})

export default Cosine
