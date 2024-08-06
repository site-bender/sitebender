const Multiply =
	(datatype = "Number") =>
	(multipliers = []) => ({
		tag: "Multiply",
		multipliers,
		datatype,
	})

export default Multiply
