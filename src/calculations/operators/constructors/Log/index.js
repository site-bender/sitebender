const Log =
	(datatype = "Number") =>
	operand => ({
		tag: "Log",
		operand,
		datatype,
	})

export default Log
