const HyperbolicTangent =
	(datatype = "Number") =>
	operand => ({
		tag: "HyperbolicTangent",
		operand,
		datatype,
	})

export default HyperbolicTangent
