const HyperbolicSine =
	(datatype = "Number") =>
	operand => ({
		tag: "HyperbolicSine",
		operand,
		datatype,
	})

export default HyperbolicSine
