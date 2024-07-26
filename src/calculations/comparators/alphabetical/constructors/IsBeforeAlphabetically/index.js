const IsBeforeAlphabetically =
	(datatype = "String") =>
	operand =>
	test => ({
		tag: "IsBeforeAlphabetically",
		datatype,
		operand,
		test,
	})

export default IsBeforeAlphabetically
