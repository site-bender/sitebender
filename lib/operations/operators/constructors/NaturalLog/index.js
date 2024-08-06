const NaturalLog =
	(datatype = "Number") =>
	operand => ({
		tag: "NaturalLog",
		operand,
		datatype,
	})

export default NaturalLog
