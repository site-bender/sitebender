const Hypotenuse =
	(datatype = "Number") =>
	(operands = []) => ({
		tag: "Hypotenuse",
		operands,
		datatype,
	})

export default Hypotenuse
