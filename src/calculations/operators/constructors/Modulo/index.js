const Modulo =
	(datatype = "Number") =>
	dividend =>
	divisor => ({
		tag: "Modulo",
		dividend,
		divisor,
		datatype,
	})

export default Modulo
