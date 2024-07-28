const AbsoluteValue =
	(datatype = "Number") =>
	operand => ({
		tag: "AbsoluteValue",
		operand,
		datatype,
	})

export default AbsoluteValue
