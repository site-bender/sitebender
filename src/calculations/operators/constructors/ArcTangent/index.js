const ArcTangent =
	(datatype = "Number") =>
	operand => ({
		tag: "ArcTangent",
		operand,
		datatype,
	})

export default ArcTangent
