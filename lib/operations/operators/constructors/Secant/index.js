const Secant =
	(datatype = "Number") =>
	operand => ({
		tag: "Secant",
		operand,
		datatype,
	})

export default Secant
