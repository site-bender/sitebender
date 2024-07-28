const Constant =
	(datatype = "Number") =>
	value => ({
		tag: "Constant",
		datatype,
		value,
	})

export default Constant
