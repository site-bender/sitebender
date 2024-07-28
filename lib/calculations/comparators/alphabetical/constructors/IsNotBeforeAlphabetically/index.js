const IsNotBeforeAlphabetically =
	(datatype = "String") =>
	operand =>
	test => ({
		tag: "IsNotBeforeAlphabetically",
		datatype,
		operand,
		test,
	})

export default IsNotBeforeAlphabetically
