const Min =
	(datatype = "Number") =>
	(operands = []) => ({
		tag: "Min",
		operands,
		datatype,
	})

export default Min
