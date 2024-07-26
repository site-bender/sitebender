const Average =
	(datatype = "Number") =>
	(operands = []) => ({
		tag: "Average",
		operands,
		datatype,
	})

export default Average
