const Median =
	(datatype = "Number") =>
	(operands = []) => ({
		tag: "Median",
		operands,
		datatype,
	})

export default Median
