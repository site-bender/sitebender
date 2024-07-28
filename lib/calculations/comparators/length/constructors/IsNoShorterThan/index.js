const IsNoShorterThan =
	(datatype = "String") =>
	operand =>
	test => ({
		tag: "IsNoShorterThan",
		datatype,
		operand,
		test,
	})

export default IsNoShorterThan
