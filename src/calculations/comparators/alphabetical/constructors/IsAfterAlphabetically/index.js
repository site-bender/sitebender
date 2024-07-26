const IsAfterAlphabetically =
	(datatype = "String") =>
	operand =>
	test => ({
		tag: "IsAfterAlphabetically",
		datatype,
		operand,
		test,
	})

export default IsAfterAlphabetically
