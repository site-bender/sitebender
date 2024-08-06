const HyperbolicCosine =
	(datatype = "Number") =>
	operand => ({
		tag: "HyperbolicCosine",
		operand,
		datatype,
	})

export default HyperbolicCosine
