const IsNotAfterAlphabetically =
	(datatype = "String") =>
	operand =>
	test => ({
		tag: "IsNotAfterAlphabetically",
		datatype,
		operand,
		test,
	})

export default IsNotAfterAlphabetically
