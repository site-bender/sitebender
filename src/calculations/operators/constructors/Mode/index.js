const Mode =
	(datatype = "Number") =>
	(operands = []) => ({
		tag: "Mode",
		operands,
		datatype,
	})

export default Mode
