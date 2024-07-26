const LogBaseTwo =
	(datatype = "Number") =>
	operand => ({
		tag: "LogBaseTwo",
		operand,
		datatype,
	})

export default LogBaseTwo
