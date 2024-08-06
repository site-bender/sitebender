const IsShorterThan =
	(datatype = "String") =>
	operand =>
	test => ({
		tag: "IsShorterThan",
		datatype,
		operand,
		test,
	})

export default IsShorterThan
