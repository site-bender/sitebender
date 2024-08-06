const Subtract =
	(datatype = "Number") =>
	minuend =>
	subtrahend => ({
		tag: "Subtract",
		minuend,
		subtrahend,
		datatype,
	})

export default Subtract
