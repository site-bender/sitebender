const Mean =
	(datatype = "Number") =>
	(operands = []) => ({
		tag: "Mean",
		operands,
		datatype,
	})

export default Mean
