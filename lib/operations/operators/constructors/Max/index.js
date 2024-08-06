const Max =
	(datatype = "Number") =>
	(operands = []) => ({
		tag: "Max",
		operands,
		datatype,
	})

export default Max
