const IsMoreThan =
	(datatype = "Number") =>
	operand =>
	test => ({
		tag: "IsMoreThan",
		datatype,
		operand,
		test,
	})

export default IsMoreThan
