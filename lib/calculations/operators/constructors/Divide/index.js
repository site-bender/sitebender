const Divide =
	(datatype = "Number") =>
	dividend =>
	divisor => ({
		tag: "Divide",
		dividend,
		divisor,
		datatype,
	})

export default Divide
