const Sine =
	(datatype = "Number") =>
	operand => ({
		tag: "Sine",
		operand,
		datatype,
	})

export default Sine
