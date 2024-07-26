const Remainder =
	(datatype = "Number") =>
	dividend =>
	divisor => ({
		tag: "Remainder",
		dividend,
		divisor,
		datatype,
	})

export default Remainder
