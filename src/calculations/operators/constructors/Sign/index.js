const Sign =
	(datatype = "Number") =>
	operand => ({
		tag: "Sign",
		operand,
		datatype,
	})

export default Sign
